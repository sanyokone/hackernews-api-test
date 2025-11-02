const apiClient = require ('./helpers/apiClient')

describe('Hacker News API - Top Stories', () => {
    let topStories;

    beforeAll(async () => {
        const response = await apiClient.get('/topstories.json').catch(err => err.response);
        topStories = response.data;
    })

    test('Validate list of Top stories is not empty', () => {
        expect(Array.isArray(topStories)).toBe(true)
        expect(topStories.length).toBeGreaterThan(0)
    })

    test('Validate each ID in the list is a number', () => {
        expect(topStories).toEqual(
            expect.arrayOf(expect.any(Number)),
        )
    })

    test('Validate list of Top stories does not exit 500 records', () => {
        expect(topStories.length).toBeLessThanOrEqual(500)
    })

    test('Top stories should have unique IDs', async () => {
        const uniqueIds = new Set(topStories);
        expect(uniqueIds.size).toBe(topStories.length);
      });
})
