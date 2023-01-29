import { connect } from "mongoose";
import { MONGODB_URI } from './config.js';

export const connectDB = async () => {
    try {
        
        await connect(MONGODB_URI);
        
        console.log('connect to db');
    
    } catch(err) {
      
        console.log(err);
    
    }
};