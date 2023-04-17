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

    id(){
        const elementos = this.getAll();
        const l=elementos.length
        if(l===0){
        return 1;
        } else{
            const index=elementos[l-1]
            return index? index.id + 1:1
        }
    }

    save(elemento) {
        const elementos = this.getAll();
         elemento.id=this.id()
        elementos.push(elemento)
        fs.writeFileSync(this.filePath, JSON.stringify(elementos)); 
        return elementos
      
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

    itemId(){
        const listas=this.getAll()
     const itemsList=listas.map((list)=>list.items ).flat().map((item)=>item.id)
        
          const maxItem=itemsList.length>0?  Math.max(...itemsList)+1:1
        return maxItem   
    }   
    
    addItemToList(id,name,descriptionItem){
        this.itemId()
        const list=this.getById(id) 
              const newItem={
                name,
                descriptionItem,
                id:this.itemId()
            }
        list.items.push(newItem)
       const allElements=this.getAll()
       const updatedElements = allElements.map(element => {
        if (element.id === id) {
          return list
        }
        return element
      })    
      this._saveAll(updatedElements)   
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
                id:registro[index].id,
                items:object.items
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