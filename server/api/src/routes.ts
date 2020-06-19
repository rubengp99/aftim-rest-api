import { Application } from 'express';
import grupo from './components/grupos/route';
import subgrupos from './components/subgrupos/route';
import conceptos from './components/conceptos/route';
import marcas from './components/marcas/route';
import unidades from './components/unidades/route';
import depositos from './components/depositos/route';
import movDep from './components/movimiento_deposito/route';
import areasAtencion from './components/areas_atencion/route';
import banco from './components/banco/route';
import cambio from './components/cambio/route';
import cargos from './components/cargos/route';
import ciudad from './components/ciudad/route';
import clientes from './components/clientes/route';
import descargos from './components/descargos/route';
import empresa from './components/empresa/route';
import entidad from './components/entidad/route';
import galeria from './components/entidad/route';
import pedidos from './components/pedidos/route';
import tipos from './components/tipos/route';
import usuario from './components/usuario/route';
import facturas from './components/facturas/route';
import movimientoBanco from './components/movimiento_banco/route';
import vendedores from './components/vendedor/route';
import objetivos_ventas from './components/objetivos_ventas/route';
import compras from './components/compras/route';
import rutas from './components/servicio_rutas/route';
import ensamblados from './components/ensamblado/route';
import direcciones from './components/direcciones/route';
import pagos from './components/pagos/route';
import movimiento_caja from "./components/movimientos_caja/route";
export const routes = (app: Application) => {
    app.use('/api/grupos', grupo);
    app.use('/api/subgrupos', subgrupos);
    app.use('/api/conceptos', conceptos);
    app.use('/api/marcas', marcas);
    app.use('/api/unidades', unidades);
    app.use('/api/depositos', depositos);
    app.use('/api/movimiento_deposito', movDep);
    app.use('/api/areas_atencion', areasAtencion);
    app.use('/api/banco', banco);
    app.use('/api/cambio', cambio);
    app.use('/api/cargos', cargos);
    app.use('/api/ciudad', ciudad);
    app.use('/api/clientes', clientes);
    app.use('/api/descargos', descargos);
    app.use('/api/empresa', empresa);
    app.use('/api/entidad', entidad);
    app.use('/api/galeria', galeria);
    app.use('/api/pedidos', pedidos);
    app.use('/api/tipos', tipos);
    app.use('/api/usuario', usuario);
    app.use('/api/factura', facturas);
    app.use('/api/movimiento_banco', movimientoBanco);
    app.use('/api/vendedor',vendedores);
    app.use('/api/objetivos_ventas',objetivos_ventas);
    app.use('/api/compras', compras);
    app.use('/api/movimiento_caja', movimiento_caja);
    app.use('/api/rutas',rutas);
    app.use('/api/ensamblados',ensamblados);
    app.use('/api/direcciones',direcciones);
    app.use('/api/pagos',pagos);
    app.use('*', async (req, res, next) => {
        res.status(404).json({ message: "Route not especified" });
    });
};
