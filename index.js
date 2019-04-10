const express = require('express');
const app = express();
app.use(express.json());
const Joi = require('joi');

const movies = [
  {Id: 1, Category: "Bollywood", Title: "Jodha-Akbar"},
  {Id: 2, Category: "Hollywood", Title: "Avengers"},
  {Id: 3, Category: "Telugu", Title: "Geetha-Govindam"},
  {Id: 4, Category: "Cartoon", Title: "Frozen"}
]

/**
* @author Pooja Sharma
* To fetch all movies data
*/
app.get('/', (req, res) => {
  res.send(movies);
});

/**
* @author Pooja Sharma
* To fetch perticuler movie data by ID
*/
app.get('/:Id', (req, res) => {
 const movieId = movies.find(m => m.Id === parseInt(req.params.Id));
  if(!movieId) return res.status(404).send('This movie id is not available');
   res.send(movieId);
});

/**
* @author Pooja Sharma
* To add new movie data
*/
app.post('/', (req, res) => {
   //Valid movie data validation
  const { error } = validateInputdata(req.body);
   if(error) return res.status(400).send(error.details[0].message);
       const newMovie = {
                 Id: movies.length + 1,
                 Category: req.body.Category,
                 Title: req.body.Title,
              };

       // Add movie data
        movies.push(newMovie);
        res.send(newMovie);
});

/***
* @author Pooja Sharma
* Update movie name by ID
*/

app.put('/:Id', (req, res) => {
  //Name validation
  const new_movie_name = movies.find(m => m.Id === parseInt(req.params.Id));
  if(!new_movie_name) return res.status(404).send('This movie id is not available');

  // Movie data validation
  const { error } = validateInputdata(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // Update movie data
  new_movie_name.Title = req.body.Title;
  res.send(new_movie_name);
});

/***
* @author Pooja Sharma
* Delete movie data by id
*/

app.delete('/:Id', (req, res) => {
  // Category validation
  const old_movie_Id = movies.find(m => m.Id === parseInt(req.params.Id));
  if(!old_movie_Id) return res.status(404).send('This movie id is not available');

  // delete movie data
  const number = movies.indexOf(old_movie_Id);
  movies.splice(number,1);
  res.send(old_movie_Id);
});

/**
* Data validation
*/
function validateInputdata(result) {
    const schema = {
      Category:Joi.string().min(3).required(),
      Title: Joi.string().min(3).required(),
  }
      return Joi.validate(result, schema);
}

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listen on port  ${port}`));