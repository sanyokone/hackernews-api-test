const apiClient = require ('./helpers/apiClient')
const Ajv = require ('ajv');
const ajv = new Ajv({ allErrors: true });
const storySchema = require('./helpers/schemas/storySchema');

describe('Hacker News API - Top Story Details', () => {
    let topStoryId;
    let topStory;
    
    //'GET - Top Story details' 
    beforeAll(async () => { 
            const response = await apiClient.get('/topstories.json').catch(err => err.response);
            expect(response.status).toBe(200);
            topStoryId = response.data[0];
            const story = await apiClient.get(`/item/${topStoryId}.json`)
            topStory = story.data;
    })

    test('Validate value of required property - "ID"', async () => {
        expect(topStory.id).toEqual(topStoryId)
    })

    test('Validate story schema', async () => {
        const validate = ajv.compile(storySchema)
        const valid = validate(topStory)

        if (!valid) console.error('Schema errors:', validate.errors);
        expect(valid).toBe(true);
    })

    test('[Negative] Invalid story ID ', async () => {
        const { data } = await apiClient.get('/item/0.json');
        expect(data).toBeNull();
    });
})
