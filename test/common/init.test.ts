import {Country} from '../../data/countries'
import {columbiaMock} from '../../mocks/Columbia'
import {assertStatus200} from '../utils/assertions'
import {addLanguage, ILanguage} from '../utils/modification'
import {restCountriesRequest} from '../utils/request'


const country = Country.Columbia

describe('common tests', () => {
  // Check that service is availiable (if its failed - no reason to execute all other tests)
  beforeAll(async () => {
    const {status} = await restCountriesRequest.get(`/`)
    assertStatus200(status, `Failed to get service: ${status}`)
  })

  // Check that service for selected country is availiable
  it('should check that service for selected country is availiable', async () => {
    const {status} = await restCountriesRequest.get(`/rest/v2/alpha/${country}`)

    assertStatus200(status, `Failed to get country info: ${status}`)
  })

  //Example of test if we need strong Equal of response
  it('should check that data is Equal', async () => {
    const {body} = await restCountriesRequest.get(`/rest/v2/alpha/${country}`)
    
    expect(body).toEqual(columbiaMock)
  })

  //Example of test if country language was modified
  it('should check that modified language used same format', async () => {
    const {body} = await restCountriesRequest.get(`/rest/v2/alpha/${country}`)

    //next part simulatates that language was edited
    //-------------------------------------------
    let modified = body

    const data: ILanguage = {
      iso639_1: 'esChanged',
      iso639_2: 'spaChanged',
      name: 'SpanishChanged',
      nativeName: 'EspañolChanged'
    }

    addLanguage(modified.languages, data)
    //--------------------------------------------

    //we checked that all languages in response will be in format that need for our app
    //main idea of that test, that for our app needs only values from ILanguage interface
    modified.languages.forEach(element => {
      expect(element).toEqual({
        iso639_1: expect.any(String),
        iso639_2: expect.any(String),
        name: expect.any(String),
        nativeName: expect.any(String)
      })
    })
  })

  it('should check that modified translations used same format', async () => {
    const {body} = await restCountriesRequest.get(`/rest/v2/alpha/${country}`)

    //next part simulatates that translation was edited
    //-------------------------
    let modified = body
    modified.translations = {...modified.translations, ru: 'TestData'}
    //-------------------------

    //we checked translations that will be used in our app, we can left only needed in list below
    expect(modified.translations).toEqual(
      expect.objectContaining({
        de: expect.any(String),
        es: expect.any(String),
        fr: expect.any(String),
        ja: expect.any(String),
        it: expect.any(String),
        br: expect.any(String),
        pt: expect.any(String),
        nl: expect.any(String),
        hr: expect.any(String),
        fa: expect.any(String)
      })
    )
  })
})
