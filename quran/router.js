require('dotenv').config()

const { Router } = require('express')
const { caching } = require('./middlewares')
const SurahHandler = require('./handlers/surah')

const router = Router()

// surah router
router.get('/surah', caching, SurahHandler.getAllSurah)
router.get('/surah/:surah', caching, SurahHandler.getSurah)
router.get('/surah/:surah/:ayah', caching, SurahHandler.getAyahFromSurah)

// root router
router.get('/', (req, res) => res.status(200).send({
    creator: {
      author: `Sutan Gading Fadhillah`,
      maintainer: `I T S U K I`,
      github: `https://github.com/YusufGabut/islam-api/`
      },
      surah: {
      mengambilSurah: {
      pattern: `islam-api.herokuapp.com/quran/surah/{surah}`,
      example: `islam-api.herokuapp.com/quran/surah/18`
      },
      mengambilAyatDiSurah: {
      patern: `islam-api.herokuapp.com/quran/surah/{surah}/{ayat}`,
      example: `islam-api.herokuapp.com/quran/surah/18/3`
      }
   }
}))

// fallback router
router.all('*', (req, res) => res.status(404).send({
    code: 404,
    status: 'Not Found.',
    message: `Resource "${req.url}" is not found.`
}))

module.exports = router