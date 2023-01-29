import { Note } from './models/Note.js';

export default (io) => {

    io.on('connection', (socket) => {

        const emitNotes = async () => {
            try { 
                const notes = await Note.find();
                socket.broadcast.emit('server:loadnotes', notes);
            } catch (error) {
                console.log(error);
            }
        }

        emitNotes();
        
        socket.on('client:createNote', async (data) => {
                try {
                    const note = await new Note({
                        title: data.title,
                        description: data.description
                    });
                    note.save((err) => {
                        if(err) {
                            console.log("ocurrio un error");
                            socket.emit('server:alert', false);
                        } else {
                            console.log("Note Created");
                            emitNotes();
                            socket.emit('server:alert', true);
                        }
                    })
                } catch(err) {
                    console.log(err);
                }
        })
    
        socket.on('client:delete', async (id) => {
            console.log("Esta es la id para borrar: " + id);

            try {

                if(id === null || id === "" || id === undefined) {
                   console.log("Error");
                } else {
                    await Note.findByIdAndDelete(id);
                    await emitNotes();
                }
        
            } catch(err) {
                console.log(err);
            }
            
        })

        socket.on('client:update', async (data) => {

            try {

                if(!data.title && !data.description) {
                    console.log("ERROR AL ACTUALIZAR");
                } else {
                    
                    if(data.title) {
                        await Note.findByIdAndUpdate(data.id, { title: data.title })

                    }
    
                    if(data.description) {
                        await Note.findByIdAndUpdate(data.id, { description: data.description })
                    }

                    emitNotes();

                }

            } catch(err) {
                console.log(err);
            }

        })

    })
   
}