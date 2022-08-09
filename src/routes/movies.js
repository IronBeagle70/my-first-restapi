const {Router} = require('express');
const router =Router();

const _ = require('underscore'); //library to traverse an array

const movies = require('../dbsimulator.json');


//GET
//Todas las peliculas
router.get('/',(req,res)=>{
    res.json(movies);
});
//pelicula por ID
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    _.each(movies,(movie,i)=>{
        if(movie.id==id){
            res.json(movie);
        } else{
            res.status(404).json({"error":"no existe"});
        }
    });
    
});

//POST
router.post('/',(req,res)=>{
    const {title,director,year,rating}=req.body;
    if(title && director && year && rating){
        const id=movies.length+1;
        const newMovie={...req.body, id};
        movies.push(newMovie);
        res.json(movies);
    } else{
        res.status(500).json({"error":"There was an error"});
    }
});

//DELETE
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    _.each(movies,(movie,i)=>{
        if(movie.id==id){
            movies.splice(i,1);
        }
    });
    res.send(movies);
});


//PUT
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {title,director,year,rating}=req.body;
    if(title && director && year && rating){
        _.each(movies, (movie, i)=>{
            if(movie.id==id){
                movie.title=title;
                movie.director=director;
                movie.year=year;
                movie.rating=rating;
            }
        });
        res.json(movies);
    } else{
        res.status(500).json({"error":"There was error"});
    }
})

module.exports=router;