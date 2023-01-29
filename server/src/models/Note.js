import { Schema, model } from 'mongoose';

const NoteSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export const Note = model('Note', NoteSchema);