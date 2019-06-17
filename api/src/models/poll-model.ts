import { Attributes } from "./model";
import { Document, Schema, Mongoose, Model } from "mongoose";

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



/**
 * Crée le modèle.
 * 
 * @param mongooseInstance Instance de Mongoose
 * @returns Modèle créé
 */
export default function createModel(mongooseInstance: Mongoose): Model<PollInstance> {
    return mongooseInstance.model<PollInstance>('Poll', schema);
}



/**
 * Interface regroupant les attributs du modèle.
 */
export interface PollAttributes extends Attributes {
    title: string;
    options: {
        ipChecking: boolean;
        multiple: boolean;
    },
    choices: [{
        _id?: string;
        name: string;
        voters: [{
            _id?: string;
            ip: string;
        }]
    }]
}



/**
 * Interface de l'instance du modèle.
 */
export interface PollInstance extends PollAttributes, Document {}