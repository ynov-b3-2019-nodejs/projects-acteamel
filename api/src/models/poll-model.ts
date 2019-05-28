import { Attributes } from "./model";
import { Document, Schema, Mongoose, Model } from "mongoose";

export interface PollAttributes extends Attributes {
    title: string;
    options: {
        ipChecking: boolean;
        multiple: boolean;
    },
    choices: [{
        name: string;
        voters: [{
            ip: string;
        }]
    }]
}



export interface PollInstance extends PollAttributes, Document {}



const schema = new Schema<PollInstance>({
    title: {
        type: Schema.Types.String,
        required: [true, 'Missing title'],
        maxlength: [100, 'name is too long, 100 characters maximum']
    },
    options: {
        ipChecking: {
            type: Schema.Types.Boolean,
            required: [true, 'Missing ip checking option']
        },
        multiple: {
            type: Schema.Types.Boolean,
            required: [true, 'Missing multiple option']
        }
    },
    choices: [{
        name: {
            type: Schema.Types.String,
            required: [true, 'Missing choice name']
        },
        voters: [{
            ip: {
                type: Schema.Types.String,
                required: [true, 'Missing voter ip address']
            }
        }]
    }]
}, {
    timestamps: true
});



export default function createModel(mongooseInstance: Mongoose): Model<PollInstance> {
    return mongooseInstance.model<PollInstance>('Poll', schema);
}