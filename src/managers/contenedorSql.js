const knex = require("knex");

class ContenedorSql{
    constructor(options, tableName){
        this.database = knex(options);
        this.tableName = tableName;
    }

    async getAll(){
        try {
            //select * from products
            const data = await this.database.from(this.tableName).select("*");
            const result = data.map(element=>({...element}));
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async save(newData){
        try {
            const [id] = await this.database.from(this.tableName).insert(newData);
            console.log(id);
            return `new element saved with id: ${id}`;
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            const data = await this.database.from(this.tableName).where("id",id);
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            const data = await this.database.from(this.tableName).where("id",id).del();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(id, newData){
        console.log(id);
        try {
            await this.database.from(this.tableName).where("id",id).update(newData);
            const data = await this.database.from(this.tableName).where("id",id);
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            const data = await this.database.from(this.tableName).del();
            return data;
        } catch (error) {
            console.log(error)
        }
    }
}



module.exports = ContenedorSql;