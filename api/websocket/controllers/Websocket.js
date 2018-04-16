module.exports = {

  health: async(ctx) =>{
    //Our logic

    //Send cluster health
    let data = await strapi.services.websocket.health();


    ctx.send({
      message: data
    });
  }
}
