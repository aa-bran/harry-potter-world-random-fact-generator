import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const endpointArray = [
    'https://potterapi-fedeperin.vercel.app/en/spells/random',
    'https://potterapi-fedeperin.vercel.app/en/houses/random',
    'https://potterapi-fedeperin.vercel.app/en/characters/random'
];

function getRandomEndpoint() {
    const endpoints = [
        'https://potterapi-fedeperin.vercel.app/en/spells/random',
        'https://potterapi-fedeperin.vercel.app/en/houses/random',
        'https://potterapi-fedeperin.vercel.app/en/characters/random'
    ];

    const endpointFields = {
        'https://potterapi-fedeperin.vercel.app/en/spells/random': {
          label: 'spell',
          fact1: 'use',
          fact2: 'Nobody: ... Harry: ExPeLlIaRmUs!'
        },
        'https://potterapi-fedeperin.vercel.app/en/houses/random': {
          label: 'house',
          fact1: 'emoji',
          fact2: 'founder'
        },
        'https://potterapi-fedeperin.vercel.app/en/characters/random': {
          label: 'fullName',
          fact1: 'hogwartsHouse',
          fact2: 'birthdate'
        }
      };
    
      const randomIndex = Math.floor(Math.random() * endpoints.length);
      const randomEndpoint = endpoints[randomIndex];
      const fields = endpointFields[randomEndpoint];
    
      const dynamicFields = {};
      Object.keys(fields).forEach((key) => {
        dynamicFields[key] = fields[key];
      });
    
      return { randomEndpoint, ...dynamicFields };
    }

app.get('/', async (req, res) => {
    const { randomEndpoint, label, fact1, fact2 } = getRandomEndpoint();
    try {
        const response = await axios.get(randomEndpoint);
        const data = response.data;
        const result = {
            label: data[label],
            fact1: data[fact1],
            fact2: data[fact2],
        }
        // res.json(result);
        console.log(`Result: ${result[label]}`)
        console.log(`label: ${result.label}, fact1: ${result.fact1}, fact2: ${fact2}`)
        res.render('index.ejs', {
            labelKey: label,
            labelData: result.label,
            fact1Key: fact1,
            fact1Data: result.fact1,
            fact2Key: fact2,
            fact2Data: result.fact2,
        });
    } catch(error) {
        res.status(404).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});