/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 12/31/12
 * Time: 6:39 PM
 * To change this template use File | Settings | File Templates.
 */
describe("Namespace Test Suite", function(){
    it('can create namespace', function () {
        BytePushers.namespace("utils");
        BytePushers.utils.name = "tonte";
        BytePushers.utils.getName = function(){
            return this.name;
        };
        expect(BytePushers.utils).toBeDefined("BytePushers.utils should be defined.");
        expect(BytePushers.utils.name).toBe("tonte");
        expect(BytePushers.utils.getName()).toBe("tonte");
        var model = BytePushers.namespace("utils.model");
        expect(BytePushers.utils.model).toBeDefined();
        expect(model).toBeDefined();
        BytePushers.utils.model.name = "tim";
        BytePushers.utils.model.getName = function(){
            return this.name;
        };
        expect(BytePushers.utils.model.name).toBe("tim");
        expect(BytePushers.utils.model.getName()).toBe("tim");
    });
    it('can create nested namespace', function () {
        BytePushers.namespace("com.bytepushers.utils.NumberUtility1");
        expect(BytePushers.com.bytepushers.utils.NumberUtility1).toBeDefined();
        BytePushers.NumberUtility2 = BytePushers.namespace("com.bytepushers.utils.NumberUtility2");
        expect(BytePushers.com.bytepushers.utils.NumberUtility2).toBeDefined();
        expect(BytePushers.NumberUtility2).toBeDefined();
        expect(BytePushers.com.bytepushers.utils.NumberUtility2).toBe(BytePushers.NumberUtility2);
        BytePushers.NumberUtility2.process = "Hi";
        expect("Hi").toBe(BytePushers.NumberUtility2.process);
    });
});