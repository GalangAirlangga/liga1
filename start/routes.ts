/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
});
Route.group(() => {
  Route.post('/login', 'AuthController.login');
  //Route.post('/register', 'AuthController.register');
});
//route for club
Route.group(()=>{
  Route.get('/clubs','ClubsController.index');
  Route.get('/clubs/:slug','ClubsController.show');
  Route.post('/clubs','ClubsController.store');
  Route.put('/clubs/:id','ClubsController.update');
  Route.delete('/clubs/:slug','ClubsController.destroy');
});
Route.group(()=>{
  Route.get('/leagues', 'LeaguesController.index');
  Route.get('/leagues/:slug', 'LeaguesController.show');
  Route.get('/leagues/:id/teams', function (ctx: any) {
    // ctx.params('slug');
    return {
      slug: ctx.params.id,
    }
  });
})
