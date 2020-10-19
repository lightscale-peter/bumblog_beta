// exports.register = (req, res) => {
//     res.send('this router is working');

//     const {username, password} = req.body;
// };

import {Request, Response} from 'express';

export default (req: Request, res: Response) => {
    res.send('this router is working');

    const {username, password} = req.body;
};