import { Request, Response } from 'express';

const hb1 = (req: Request, res: Response) => {
    res.render('hb1', { title: 'Express + HBS!' });
};

const hb2 = (req: Request, res: Response) => {
    res.render('hb2', { title: 'Express Framework' });
};

const hb3 = (req: Request, res: Response) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('hb3', { title: 'Professores do IComp', profes });
};

export default { hb1, hb2, hb3 };
