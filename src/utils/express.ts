import type { Router } from 'express';

type TraversedRoute = {
    path: string;
    methods: {
        get?: boolean;
        post?: boolean;
        put?: boolean;
        delete?: boolean;
        patch?: boolean;
    };
};

export const getRegisteredRoutes = (router: Router): Array<TraversedRoute> => {
    const traverseRoutes = (router: Router, parent = ''): Array<TraversedRoute> => {
        return router.stack
            .flatMap(({ route, handle, name, ...rest }: any) => {
                if (route)
                    return [
                        {
                            path: `${parent}${route.path}`,
                            methods: {
                                ...route.methods
                            }
                        }
                    ];
                else if (name !== 'router') return [];

                const path = rest.regexp.source.replace('\\/?(?=\\/|$)', '').slice(1).replace('\\', '');
                return traverseRoutes(handle, `${parent}${path}`);
            })
            .filter((route) => route);
    };
    const routes = traverseRoutes(router);

    // Merge routes with the same path buth different method(s)
    return Object.values(
        routes.reduce((accu, item) => {
            if (accu[item.path]) {
                accu[item.path].methods = {
                    ...accu[item.path].methods,
                    ...item.methods
                };
            } else {
                accu[item.path] = item;
            }

            return accu;
        }, {} as any)
    );
};
