import { Express, Router } from 'express';
import fs from 'fs';

import { DEFAULT_ENCODING, ROUTES_PATH } from '../config';

export default function (app: Express) {
    for (const route of getRoutesInCurrentFolder()) {
        import(`./${route}`).then(createRoute(app, route));
    }
}

function createRoute(
    app: Express,
    route: string,
): (router: any) => Express | PromiseLike<Express> {
    return ({ default: router }) => bindPathToRoute(app, route, router);
}

function bindPathToRoute(
    app: Express,
    route: string,
    router: Router,
): Express | PromiseLike<Express> {
    return app.use('/', router);
}

function getRoutesInCurrentFolder() {
    return fs
        .readdirSync(ROUTES_PATH, DEFAULT_ENCODING)
        .map(getRouteNameWithoutExtension)
        .filter(isRouteNotIndex);
}

function getRouteNameWithoutExtension(name: string) {
    return name.split('.')[0];
}

function isRouteNotIndex(route: string): boolean {
    return route !== 'index';
}
