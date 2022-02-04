
/**
 * The NameSorter class is used to sort a list of arrays by lastName, firstName, userID
 * where o[0] = 'userID' and o[1] = 'full name'

 * @author Steven Lee
 */

import java.util.Comparator;

public class NameSorter implements Comparator<String[]> {

	/**
	 * Compare. Compares its two arguments for order.
	 *
	 * @param o1 one of the rows we are comparing.
	 * @param o2 the other row we are comparing.
	 * @return a negative integer, zero, or a positive integer designating direction
	 *         for sorting.
	 */
	@Override
	public int compare(String[] o1, String[] o2) {
		// Gather full names and split them into first and last names
		String fullName1 = o1[1];
		String fullName2 = o2[1];
		String[] names1 = fullName1.split(" ");
		String[] names2 = fullName2.split(" ");

		// First, sort by last name
		String lastName1 = names1[1];
		String lastName2 = names2[1];
		int lastNameComparison = lastName1.compareToIgnoreCase(lastName2);
		if (lastNameComparison != 0) {
			return lastNameComparison;
		}

		// Last names are the same, now sort by first name
		String firstName1 = names1[0];
		String firstName2 = names2[0];
		int firstNameComparison = firstName1.compareToIgnoreCase(firstName2);
		if (firstNameComparison != 0) {
			return firstNameComparison;
		}

		// Names are identical, finally, sort by userID
		String userID1 = o1[0];
		String userID2 = o2[0];

		return userID1.compareToIgnoreCase(userID2);
	}
}