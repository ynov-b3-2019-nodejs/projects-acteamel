import { Attributes } from "./model";
import { Document, Schema, Mongoose, Model } from "mongoose";

export interface PollAttributes extends Attributes {
    title: string;
}



export interface PollInstance extends PollAttributes, Document {}



const schema = new Schema<PollInstance>({
    title: {
        type: Schema.Types.String,
        required: [true, 'Missing title'],
        maxlength: [100, 'name is too long, 100 characters maximum']
    }
}, {
    timestamps: true
});



export default function createModel(mongooseInstance: Mongoose): Model<PollInstance> {
    return mongooseInstance.model<PollInstance>('Poll', schema);
}