const Title = require('../models/titles.model')
const titleDal = require('../dal/index')
const titleDto = require('../dto/title.dto')


exports.createTitle = async (req) => {
    try {
        const {name} = req.body
        const title = new Title({
            name,
            persons:[]
        })
        const json = await titleDal.title.create(title)
        return {
            ...titleDto,
            name: json.name,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }

    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}


exports.listTitles = async () => { 
    try {
        const json = await titleDal.title.listAll()
        return json
    } catch (error) {
        throw new Error(error)
    }
}
