import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pokemon from 'App/Models/Pokemon'
import CreatePokemonValidator from 'App/Validators/CreatePokemonValidator'
import UpdatePokemonValidator from 'App/Validators/UpdatePokemonValidator'

export default class PokemonController {
  public async store({ request, response }: HttpContextContract) {
    const pokemonPayload = await request.validate(CreatePokemonValidator)

    const pokemon = await Pokemon.create(pokemonPayload)

    return response.created({ pokemon })
  }

  public async index({ request, response }: HttpContextContract) {
    const {
      number,
      ['primary_type']: primaryType,
      ['secondary_type']: secondaryType,
    } = request.qs()

    const page = request.input('page', 1)
    const limit = request.input('limit', 5)

    const pokemonsQuery = this.filterByQueryString(number, primaryType, secondaryType)
    const pokemons = await pokemonsQuery.paginate(page, limit)

    return response.ok({ pokemons })
  }

  public async update({ request, response }: HttpContextContract) {
    const number = request.param('number') as number

    const payload = await request.validate(UpdatePokemonValidator)
    const pokemon = await Pokemon.findByOrFail('number', number)

    const updatedPokemon = await pokemon.merge(payload).save()

    return response.ok({ pokemon: updatedPokemon })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const number = request.param('number') as number
    const pokemon = await Pokemon.findByOrFail('number', number)

    await pokemon.delete()

    return response.ok({})
  }

  private filterByQueryString(number: number, primaryType: string, secondaryType: string) {
    if (number) return this.filterByNumber(number)
    else if (primaryType || secondaryType) return this.filterByType(primaryType, secondaryType)
    else return this.all()
  }

  private all() {
    return Pokemon.query()
  }

  private filterByNumber(number: number) {
    return Pokemon.query().where('number', number)
  }

  private filterByType(primaryType: string, secondaryType: string) {
    return Pokemon.query()
      .where('primary_type', primaryType)
      .orWhere('secondary_type', secondaryType)
  }
}
