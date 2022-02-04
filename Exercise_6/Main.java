
/**
 * Takes an example CSV file, with the row format:
 * [userID, firstName lastName, version, insurance company]
 * and sorts it in ascending order by lastName, firstName. 
 * 
 * Finally, it will remove duplicate entries of the same userID and insurance company,
 * retaining only the latest version.
 * 
 * The three main limitations of this code are: 1) the row format is hard-coded into the NameSorter
 * class, 2) all rows must be fully populated, and 3) if two or more users with the same userID
 * and insuranceCompany have different names, the existing organize function will not
 * remove duplicates properly.
 * 
 * If this was production code, I would ask to know more about the file format beforehand
 * so I did not have to make these assumptions!

 * @author Steven Lee
 */

import java.io.File;

public class Main {
	public static void main(String[] args) {
		// Gather example CSV source
		File targetFile = new File("src/ExampleData.csv");
		CSVOrganizer organizer = new CSVOrganizer();

		// Load it into the organizer
		organizer.load(targetFile);

		// Attempt to organize it!
		try {
			organizer.organize();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
