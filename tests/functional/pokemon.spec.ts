import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Pokemon', () => {
  test('it should create a pokemon', async ({ assert }) => {
    const pokemonPayload = {
      number: 0,
      name: 'Pikachu',
      specie: 'Rato Pokemon',
      hp: 10,
      atk: 10,
      sp_atk: 10,
      def: 10,
      sp_def: 10,
      speed: 10,
      primary_type: 'Raio',
      secondary_type: 'Fogo',
    }
    const { body } = await supertest(BASE_URL).post('/pokemons').send(pokemonPayload).expect(201)

    assert.exists(body.pokemon, 'Pokemon Undefined')
  })

  test('it should return 422 when required data is not provided to create', async ({ assert }) => {
    const { body } = await supertest(BASE_URL).post('/pokemons').send({}).expect(422)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('it should return all pokemons when no query is provided to list', async ({ assert }) => {
    const { body } = await supertest(BASE_URL).get('/pokemons').expect(200)
    assert.exists(body.pokemons, 'Pokemons Undefined')
  })

  test('it should return pokemon by number', async ({ assert }) => {
    const { body } = await supertest(BASE_URL).get('/pokemons?number=0').expect(200)
    assert.exists(body.pokemons.data, 'Pokemons Undefined')
  })

  test('it should return pokemon by type', async ({ assert }) => {
    const { body } = await supertest(BASE_URL)
      .get('/pokemons?primaryType=Raio&secondaryType=Fogo')
      .expect(200)
    assert.exists(body.pokemons.data, 'Pokemons Undefined')
  })

  test('it should update a pokemon', async ({ assert }) => {
    const payload = {
      number: 0,
      name: 'Pikachu Pay',
      specie: 'Rato Pokemon',
      hp: 10,
      atk: 10,
      sp_atk: 10,
      def: 10,
      sp_def: 10,
      speed: 10,
      primary_type: 'Is That G',
      secondary_type: 'Pride Flag?',
    }

    const { body } = await supertest(BASE_URL)
      .put(`/pokemons/${payload.number}`)
      .send(payload)
      .expect(200)
    assert.exists(body.pokemon, 'Pokemon Undefined')
    assert.equal(body.pokemon.name, payload.name)
  })

  test('it should return 422 when required data is not provided to update', async ({ assert }) => {
    const { body } = await supertest(BASE_URL).put('/pokemons/0').send({}).expect(422)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('it should remove a pokemon', async ({ assert }) => {
    await supertest(BASE_URL).delete(`/pokemons/0`).send({}).expect(200)

    const emptyPokemon = await Database.query().from('pokemon').where('number', 0)
    assert.isEmpty(emptyPokemon)
  })
})
