import { Routes, Route } from 'react-router-dom';

// Rutas de la aplicación
import routes from './config';

import Page401 from 'pages/public/Errors/Page401';
import { useAppContext } from 'context';
import { UserRolEnum } from 'services/user/user.enum';

const ConfigRoutes = () => {
  const { user } = useAppContext();

  return (
    <Routes>
      {routes.map((e, ind) => {
        const { path, element: Component, children, isPrivate } = e;

        return isPrivate ? (
          <Route path={path} element={<Component />} key={ind}>
            {children?.map((el, indx) => {
              const { path: ruta, element: Element, roles: fixedRoles } = el;
              if (user?.roles?.includes(UserRolEnum.SUPERADMIN)) return <Route path={ruta} element={<Element />} key={indx} />;

              const findRole = fixedRoles.find((role) => user?.roles?.includes(role));
              if (!findRole) return <Route path={ruta} element={<Page401 />} key={indx} />; // Si no tiene el rol retorna 401

              return <Route path={ruta} element={<Element />} key={indx} />;
            })}
          </Route>
        ) : children ? (
          <Route path={path} element={<Component />} key={ind}>
            {children.map((el, indx) => {
              const { path: ruta, element: Element } = el;
              return <Route path={ruta} element={<Element />} key={indx} />;
            })}
          </Route>
        ) : (
          <Route path={path} element={<Component />} key={ind} />
        );
      })}
    </Routes>
  );
};

export default ConfigRoutes;
