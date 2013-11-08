describe("Wizard: Unit Tests Free Navigation", function() {

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
        w.init(steps, callback, true);
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

    it('should BE ABLE TO GO TO the last step (restricted navigation). Still callback.', function() {
        w.goto('community');
        expect(Object.keys(w.completed).length).toEqual(1);
        expect(w.index).toEqual(3);
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

    it('should go to the last step', function() {
        w.goto('community');
        expect(w.index).toEqual(3);
        expect(callback).toHaveBeenCalled();
    });

    it('should allow manually marking the current step as completed', function() {
        w.markCompleted();
        expect(Object.keys(w.completed).length).toEqual(4);
    });

    it('should allow manually marking the current step as incomple', function() {
        w.markIncomplete();
        expect(Object.keys(w.completed).length).toEqual(3);
    });

    it('should finish by marking the current step as complete and returning true', function() {
        w.finish();
        var done = w.isComplete()
        expect(Object.keys(w.completed).length).toEqual(4);
        expect(callback).toHaveBeenCalled();
        expect(done).toBe(true);
    });
});

