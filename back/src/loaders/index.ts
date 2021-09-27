import express from "express";;
import expressLoader from "./express.loader";
export default async ({expressApp} : {expressApp : express.Application}) => {

    await expressLoader({ app: expressApp });
    console.info('✌️ Express loaded');
}; 