import { Request, Response } from "express";
import { prismaClient } from "../index";
import { hashSync, compareSync } from "bcrypt"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets"



export const signup = async (request: Request, response: Response) => {
    const { name, email, password } = request.body;
    try {
        let user = await prismaClient.user.findFirst({
            where: {
                email
            }
        });

        if (user) {
            response.status(400).send('User already exists');
            return; // Stop execution here
        }

        const newUser = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashSync(password, 10)
            }
        });

        response.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }
};


export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        const user = await prismaClient.user.findFirst({ where: { email, } })

        if (!user) {
            response.status(400).send('User does not exist');
        } else if (!compareSync(password, user.password)) {
            response.status(400).send('Incorrect password');
        } else {
            const token = jwt.sign({ userId: user.id, }, JWT_SECRET);

            response.json({
                user,
                token
            })
        }

    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }

};