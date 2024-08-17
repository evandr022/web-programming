import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum();

const getLorem = (req: Request, res: Response) => {
    const num = parseInt(req.params.num, 10);
    if (isNaN(num) || num <= 0) {
        res.status(400).send('Número de parágrafos inválido.');
        return;
    }

    const loremText = Array(num).fill('').map(() => lorem.generateParagraphs(1)).join('\n\n');
    res.send(`<pre>${loremText}</pre>`);
};

export default { getLorem };
