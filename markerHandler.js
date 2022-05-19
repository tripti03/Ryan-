AFRAME.registerComponent('marker-handler',{
    init: async function(){
        var dishes = await this.getDishes()

        this.el.addEventListener('markerFound',()=>{
            var markerId = this.el.id
            this.handleMarkerFound(dishes,markerId)
        })
        this.el.addEventListener('markerLost',()=>{
            
            this.handleMarkerLost()
        })
    },
    
    handleMarkerFound: function(dishes,markerId){
        var buttonDiv = document.getElementById('button-div')
        buttonDiv.style.display = 'flex'
        var ratingButton = document.getElementById('ratingButton')
        var orderButton = document.getElementById('orderButton')
        ratingButton.addEventListener('click',()=>{
            swal({
                icon:'warning',
                title:'rate dish',
                text:'Work in Progress'
            })
        })
        orderButton.addEventListener('click',()=>{
            swal({
                icon:'https://i.imgur.com/4NZ6uLY.jpg',
                title:'Thanks for ordering',
                text:'Your order will be served'
            })
        })

        var dish = dishes.filter(dish=>dish.id===markerId)[0]
        var model = document.querySelector(`#model-${dish.id}`)
        model.setAttribute('position',dish.modelGeometry.position)
        model.setAttribute('rotation',dish.modelGeometry.rotation)
        model.setAttribute('scale',dish.modelGeometry.scale)

    },

    handleMarkerLost: function(){
        var buttonDiv = document.getElementById('button-div')
        buttonDiv.style.display = 'none'
    },
    
    getDishes: async function(){
        return await firebase.firestore()
        .collection('dishes')
        .get()
        .then(snap=>{
            return snap.docs.map(doc=>doc.data())
        })
    }

})