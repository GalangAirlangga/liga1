import Club from 'App/Models/Club'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateClubValidator from 'App/Validators/CreateClubValidator'
import IndexClubValidator from 'App/Validators/IndexClubValidator'
import UpdateClubValidator from 'App/Validators/UpdateClubValidator'
import Drive from '@ioc:Adonis/Core/Drive'
export default class ClubsController {
  /**
   *  Get all clubs.
   * @param country - country of the club
   * @param name - name of the club
   * @returns - list of clubs
   */
  public async index({ response, request }) {
    //run db transaction
    const trx = await Database.transaction()
    try {
      //validate schema
      const validation = await request.validate(IndexClubValidator)
      //get data from database
      var clubs = await Club.query()
        .select('id','full_name', 'slug', 'logo', 'country', 'city', 'stadium', 'stadium_capacity', 'stadium_description', 'stadium_location', 'stadium_image', 'fans_name')
        .if(validation.name, (builder) => {
          builder.where('full_name', 'like', `%${validation.name}%`)
        }).if(validation.country, (builder) => {
          builder.where('country', 'like', `%${validation.country}%`)
        })
        trx.commit()
      return response.json({
        message: 'List of clubs',
        data: clubs
      })
    }
    catch (error) {
      //handle error
      trx.rollback()
      return response.badRequest({message:error.messages})
    }

  }
  /**
   *
   * Create/save a new club.
   */
  public async store({ response, request }) {


    //create new club
    const trx = await Database.transaction()
    try {
      //valida schema
      const validation = await request.validate(CreateClubValidator)
      //define logo
      const logo = request.file('logo');
      //define stadium image
      const stadiumImage = request.file('stadium_image');

      //get file name
      const fileNameLogo = `${validation.full_name}.jpg`;
      const fileNameStadium = `${validation.stadium}-${validation.full_name}.jpg`;

      const club = await Club.create(
        {
          full_name: validation.full_name,
          short_name: validation.short_name,
          slug: validation.slug,
          logo: fileNameLogo,
          country: validation.country,
          city: validation.city,
          stadium: validation.stadium,
          stadium_capacity: validation.stadium_capacity,
          stadium_description: validation.stadium_description,
          stadium_location: validation.stadium_location,
          stadium_image: fileNameStadium,
          fans_name: validation.fans_name,
        }
      )
      //save logo
      await logo.moveToDisk('./images/clubs', {
        name: fileNameLogo,
        contentType: 'image/jpeg',
        overwrite: true
      })
      //save stadium image
      await stadiumImage.moveToDisk('./images/stadiums', {
        name: fileNameStadium,
        contentType: 'image/jpg',
        overwrite: true,
      })
      await trx.commit()
      //return response success
      return response.json({
        message: 'Your club has been created',
        data: club
      })
    } catch (error) {
      await trx.rollback()
      response.badRequest({message:error.messages})
    }

  }

  public async show({ request, response }) {
    //get slug
    const slug = request.param('slug')
    //get club
    const trx = await Database.transaction()
    try {
      const club = await Club.query()
        .select('full_name', 'slug', 'logo', 'country', 'city', 'stadium', 'stadium_capacity', 'stadium_description', 'stadium_location', 'stadium_image', 'fans_name')
        .where('slug', slug).first()
      await trx.commit()
      //if club not found
      if (!club) {
        return response.status(404).json({
          message: 'Club not found'
        })
      }
      //return response
      return response.json({message:'Details of club',data:club})
    } catch (error) {
      await trx.rollback()
      return response.badRequest({message:error.messages})
    }

  }

  public async update({request,response}) {

    //run db transaction
    const trx = await Database.transaction()
    try {
      //check validation data
      const validation = await request.validate(UpdateClubValidator)
      //get club
      const club = await Club.findBy('id', request.param('id'))
      if(!club) {
        return response.status(404).json({
          message: 'Club not found'
        })
      }
      //save logo
      const logo = request.file('logo');
      //save stadium image
      const stadiumImage = request.file('stadium_image');
      //get file name
      const fileNameLogo = `${validation.full_name}.jpg`;
      if(logo) {
        await Drive.delete(`./images/clubs/${club.logo}`);
        club.logo = fileNameLogo
      }
      const fileNameStadium = `${validation.stadium}-${validation.full_name}.jpg`;
      if(stadiumImage) {

          await Drive.delete(`./images/stadiums/${club.stadium_image}`);
          club.stadium_image = fileNameStadium
      }


      //update club
      club.full_name = validation.full_name
      club.short_name = validation.short_name
      club.slug = validation.slug
      club.country = validation.country
      club.city = validation.city
      club.stadium = validation.stadium
      club.stadium_capacity = validation.stadium_capacity
      club.stadium_description = validation.stadium_description
      club.stadium_location = validation.stadium_location
      club.fans_name = validation.fans_name

      //save club
      await club.save()

      //save logo
      await logo.moveToDisk('./images/clubs', {
        name: fileNameLogo,
        contentType: 'image/jpeg',
        overwrite: true
      })
      //save stadium image
      await stadiumImage.moveToDisk('./images/stadiums', {
        name: fileNameStadium,
        contentType: 'image/jpg',
        overwrite: true,
      })
      //return response
      return response.json({
        message: 'Your club has been updated',
        data: club
      })
    } catch (error) {
      await trx.rollback()
      response.json({message:error.messages})
    }
   }

  public async destroy({request,response}) {
    //run db transaction
    const trx = await Database.transaction()
    try {
      //get club
      const club = await Club.findBy('slug', request.param('slug'))
      if(!club) {
        return response.status(404).json({
          message: 'Club not found'
        })
      }
      //delete logo
      await Drive.delete(`./images/clubs/${club.logo}`);
      //delete stadium image
      await Drive.delete(`./images/stadiums/${club.stadium_image}`);
      //delete club
      await club.delete()
      //return response
      return response.json({
        message: 'Your club has been deleted'
      })
    } catch (error) {
      await trx.rollback()
      response.badRequest({message:error.messages})
    }

   }
}
