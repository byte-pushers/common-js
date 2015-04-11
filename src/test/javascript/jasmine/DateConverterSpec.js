/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 12/28/12
 * Time: 12:13 PM
 * To change this template use File | Settings | File Templates.
 */
describe("Date Converter Test Suite", function(){
    it('can convert strings into date with the following date format: MMMDDYYYY', function () {
        var expectedDate = new Date();
        expectedDate.setFullYear(2012, 9, 30);
        var dateConversionFormat = BytePushers.converters.DateConverter.MMMDDYYYY_DATE_FORMAT;
        var actualDate = BytePushers.converters.DateConverter.convertToDate("Oct302012", dateConversionFormat);
        expect(actualDate).toBeDefined();
        expect(actualDate.getDate()).toEqual(expectedDate.getDate());
        expect(actualDate.getMonth()).toEqual(expectedDate.getMonth());
        expect(actualDate.getFullYear()).toEqual(expectedDate.getFullYear());
    });
    it('can get the month index using abbreviated month', function () {
        var actualMonthIndex = parseInt(BytePushers.converters.DateConverter.getMonthIndex("Oct302012".substring(0, 3)), "10");
        expect(actualMonthIndex).toEqual(9);
    });
    it('can get the day index using abbreviated month', function () {
        var actualDayIndex = parseInt("Oct302012".substring(3, 5), "10");
        expect(actualDayIndex).toEqual(30);
    });
    it('can get the year index using abbreviated month', function () {
        var actualYear = parseInt("Oct302012".substring(5), "10");
        expect(actualYear).toEqual(2012);
    });
    it('can create date with numbers', function () {
        var actualDate = new Date();
        actualDate.setFullYear(parseInt("2012", "10"), parseInt("9", "10"), parseInt("30", "10"));
        expect(actualDate).toBeDefined();
        expect(actualDate.getDate()).toEqual(30);
        expect(actualDate.getMonth()).toEqual(9);
        expect(actualDate.getFullYear()).toEqual(2012);
    });
});
