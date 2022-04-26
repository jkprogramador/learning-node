const handlers = require('../handlers')

test('home page renders', () => {
    // Arrange
    const req = {}
    const res = { render: jest.fn() } // jest.fn() generates a generic mock function that keeps track of how it's called

    // Act
    handlers.home(req, res)

    // Assert
    expect(res.render.mock.calls.length).toBe(1)
    // First array index specifies which invocation. Second array index specifies which argument mock method was called with
    expect(res.render.mock.calls[0][0]).toBe('home')
})

test('about page renders', () => {
    // Arrange
    const req = {}
    const res = { render: jest.fn() }

    // Act
    handlers.about(req, res)

    // Assert
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('about')
    // expect.objectContaining(object) matches any received object that recursively matches the expected properties
    // That is, the expected object is a subset of the received object.
    expect(res.render.mock.calls[0][1]).toEqual(expect.objectContaining({
        fortune: expect.stringMatching(/\W/),
    }))
})

test('404 page renders', () => {
    // Arrange
    const req = {}
    const res = { render: jest.fn() }

    // Act
    handlers.notFound(req, res)

    // Assert
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('404')
})

test('500 page renders', () => {
    // Arrange
    const req = {}
    const res = { render: jest.fn() }
    const next = jest.fn()
    const err = new Error('some error')

    // Act
    handlers.serverError(err, req, res, next)

    // Assert
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('500')
})