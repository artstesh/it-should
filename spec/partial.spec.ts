describe('isolated', () => {
    interface ITest {
        id: number;
        name: string;
        created: Date;
        isActive: boolean;
    }



    it('equal success', () => {
        //
        expect(() => {}).not.toThrow();
    })
})
