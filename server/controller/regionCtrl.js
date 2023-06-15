import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const region = await req.context.models.regions.findAll({
      // include :[{
      //   model: req.context.models.countries,
      //   as: "countries",
      //   include :[{
      //     model: req.context.models.locations,
      //     as: "locations"
      //   }]
      // }]
      // include: { all: true },
    });
    return res.send(region);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const region = await req.context.models.regions.findOne({
      where: { region_id: req.params.ids },
    });
    return res.send(region);
  } catch (error) {
    return res.send(error);
  }
};


//Fungsi middleware adalah fungsi yang memiliki akses ke objek permintaan (req), 
//objek respons (res), dan fungsi middleware berikutnya dalam permintaan aplikasi

const create = async (req, res, next) => {
  try {
    const region = await req.context.models.regions.create({
      region_name: req.body.name,
    });
    req.region = region
    next()
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const region = await req.context.models.regions.update(
      {
        region_name: req.body.name,
      },
      { returning: true, where: { region_id: req.params.id } }
    );
    return res.send(region);
  } catch (error) {
    return res.send(error);
  }
};

const deleted = async (req, res) => {
  try {
    const region = await req.context.models.regions.destroy({
      where: { region_id: req.params.id },
    });
    return res.send("delete " + region + " row");
  } catch (error) {
    return res.send(error);
  }
};

const querySQL = async (req, res) => {
  try {
    await sequelize
      .query("select * from regions where region_id = :id", {
        replacements: { id: req.params.id },
        type: sequelize.QueryTypes.SELECT,
      })
      .then((result) => {
        return res.send(result);
      });
  } catch (error) {
    return res.send(error);
  }
};
export default {
  findAll,
  findOne,
  create,
  update,
  deleted,
  querySQL,
};
