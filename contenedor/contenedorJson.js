const fs = require("fs");
const encoding = "utf-8"

class Contenedor {
    constructor(path) {
        this.filePath = path
        this.createFileIfNotExists()
        const data = fs.readFileSync(this.filePath, encoding)
        this.contenedor = JSON.parse(data)
    }

    createFileIfNotExists() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "[]")
        }
    }

    getAll() {
        const data = fs.readFileSync(this.filePath, encoding)
        return JSON.parse(data)
    }

    save(elemento) {
        const elementos = this.getAll();
        const l=elementos.length
        if(l===0){
            elemento.id =  1;
        elementos.push(elemento);
        fs.writeFileSync(this.filePath, JSON.stringify(elementos));
        return elemento
        } else{
            const index=elementos[l-1]
            elemento.id = index.id + 1;
            elementos.push(elemento);
            fs.writeFileSync(this.filePath, JSON.stringify(elementos));
            return elemento;
        }
    }

    _saveAll (data) {
        const stringData = JSON.stringify(data, null, 2);
        fs.writeFile(this.filePath, stringData ,encoding,(err)=>{
            if(err){
                console.log(err)
            }
        })
    }

    getById (id) {
       const registro=this.getAll()
        const find=registro.find((reg)=>reg.id===id)
        return find
    }

    updateById(id, object) {
        const registro=this.getAll()
        const find=registro.find((reg)=>reg.id===id)
        if(find===null){
            return false
        }else{
            const index =registro.findIndex(el => el.id === id);
            const newObjectUpdate={
                title:object.title,
                description:object.description,
                id:registro[index].id
            }
            registro[index]=newObjectUpdate
          this._saveAll(registro)
          return registro
        }
        
    }

    deleteById(id) {
            const data=this.getAll()
            const find=data.find((reg)=>reg.id===id)

            if(find===null){
                return false
            }else{
                const newData = data.filter(el => el.id !== id);
                this._saveAll(newData)
                return newData 
            }
    }
}

module.exports= Contenedor 