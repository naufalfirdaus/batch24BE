const create = async (req,res) => {
    try {
        const country = await req.context.models.countries.create({
            country_id: req.body.code,
            country_name: req.body.country_name,
            region_id : req.region.region_id
        })
        return res.send(country)
    } catch (error) {
        return res.send(error)
    }
}

export default {
    create
}