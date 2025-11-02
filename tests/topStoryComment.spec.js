const apiClient = require ('./helpers/apiClient')
const Ajv = require ('ajv');
const ajv = new Ajv({ allErrors: true })
const commentSchema = require('./helpers/schemas/commentSchema');

describe('Hacker News API - Top Story Comment', () => {
    let topStoryId;
    let topStory;
    let topStoryComment;
    let commentId;

    beforeAll(async () => {
        try {
        const response = await apiClient.get('/topstories.json')
        expect(response.status).toBe(200);
        topStoryId = response.data[0];

        const { data } = await apiClient.get(`/item/${topStoryId}.json`)
        topStory = data;

        if (!topStory.kids || topStory.kids.length === 0) {
            console.warn(`Story ${topStoryId} has no comments — skipping all tests.`);
        }

        commentId = topStory.kids[0];
        const comment = await apiClient.get(`/item/${commentId}.json`)
        expect(comment.status).toBe(200);

        topStoryComment = comment.data;
        
    } catch (err) {
        console.error('Error during API chain:', err.message);
        throw err; 
      }
    })    

    test('Validate required property "ID" value', async () => {
        expect(topStoryComment.id).toEqual(commentId)
    })

    test('Validate property "parent" value', async () => {
        expect(topStoryComment.parent).toEqual(topStoryId)
    })

    test('Validate comment schema', async () => {
        const validate = ajv.compile(commentSchema)
        const valid = validate(topStoryComment)

        if(!valid) console.error('Schema errors:', validate.errors);
        expect(valid).toBe(true)
    })

    test('[Negative] Invalid comment ID ', async () => {
        const { data } = await apiClient.get('/item/0.json');
        expect(data).toBeNull();
    });
    
})
