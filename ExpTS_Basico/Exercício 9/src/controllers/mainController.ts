import { Request, Response } from 'express';

const home = (req: Request, res: Response) => {
    res.render('home', { title: 'Pagina Inicial', message: 'Bem-vindo ao meu site!' });
};

const sobre = (req: Request, res: Response) => {
    res.render('sobre', { title: 'Sobre', message: 'Bem-vindo à página sobre!' });
};

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

const hb4 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true }
    ];
    res.render('hb4', { title: 'Tecnologias baseadas no NodeJS', technologies });
};

export default { home, sobre, hb1, hb2, hb3, hb4 };
