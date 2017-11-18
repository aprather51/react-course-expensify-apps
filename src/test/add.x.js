const add = (a, b) =>  a + b ;
const genGreeting = (name = 'Anonymous') => `Hello ${name}`;


test('Should Add two Numbers', () => {
    const result = add(3, 4);
    expect(result).toBe(7);
});

test('The Name should be', () => {
    const nameResult = genGreeting('Arthur');
    expect(nameResult).toBe('Hello Arthur');
} )

test('Generate No Name', () => {
    const noNameResult = genGreeting();
    expect(noNameResult).toBe('Hello Anonymous');
} )