describe("Wizard: Unit Tests Restricted Navigation", function() {

    var steps = {
            theme     : 0,
            demo      : 1,
            doc       : 0,
            community : 0
    };

    var w;

    beforeEach(module('myApp'));
    beforeEach(inject(function(wizard) {
        w = wizard;
        callback = jasmine.createSpy('cb');
        w.init(steps, callback);
    }));

    it('should contain the wizard service', function() {
        expect(w).not.toEqual(null);
    });

    it('should init on step 2 (DEMO)', function() {
        expect(w.index).toEqual(1);
    });

    it('should have previous step', function() {
        expect(w.hasPrev()).toBe(true);
    });

    it('should have next step', function() {
        expect(w.hasNext()).toBe(true);
    });

    it('should have one completed step', function() {
        expect(Object.keys(w.completed).length).toEqual(1);
        expect(w.completed.theme).toEqual(1);
    });

    it('should go to prev step (THEME), not marking current step complete, and then callback', function() {
        w.back();
        expect(Object.keys(w.completed).length).toEqual(1);
        expect(callback).toHaveBeenCalled();
    });

    it('should not have a prev step', function() {
        expect(w.hasPrev()).toBe(false);
    });

    it('should go to next step (DEMO), the current step marked completed already (keep), and callback', function() {
        w.next();
        expect(Object.keys(w.completed).length).toEqual(1);
        expect(w.index).toEqual(1);
        expect(callback).toHaveBeenCalled();
    });

    it('should NOT be able to go to the last step (restricted navigation). Still callback.', function() {
        w.goto('community');
        expect(Object.keys(w.completed).length).toEqual(1);
        expect(w.index).toEqual(1);
        expect(callback).toHaveBeenCalled();
    });

    it('should go to next step (DOC), mark current one as complete, and callback', function() {
        w.next();
        expect(Object.keys(w.completed).length).toEqual(2);
        expect(w.index).toEqual(2);
        expect(w.completed.demo).toEqual(1);
        expect(callback).toHaveBeenCalled();
    });

    it('should mark completed, go next (COMMUNITY), callback', function() {
        w.next();
        expect(Object.keys(w.completed).length).toEqual(3);
        expect(w.index).toEqual(3);
        expect(w.completed.doc).toEqual(1);
        expect(callback).toHaveBeenCalled();
    });

    it('should not have a next available', function() {
        expect(w.index).toEqual(3);
        expect(w.hasNext()).toBe(false);
    });

    it('should go to the first step, without marking last one complete, and callback', function() {
        w.goto('theme');
        expect(Object.keys(w.completed).length).toEqual(3);
        expect(callback).toHaveBeenCalled();
    });
});
