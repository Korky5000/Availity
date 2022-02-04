
/**
 * The CSVOrganizer class is used to group CSV rows by insuranceCompany and remove
 * out-dated duplicate entries

 * @author Steven Lee
 */

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

/**
 * The Class CSVOrganizer. Used to sort and compound CSV files.
 */
public class CSVOrganizer {
	private File file;
	private Map<String, ArrayList<String[]>> output;

	/**
	 * Load. Loads a CSV file.
	 *
	 * @param file the file.
	 */
	public void load(File file) {
		this.file = file;
	}

	/**
	 * Organize. Sorts and compounds the loaded file into separate files based on
	 * insurance company.
	 *
	 * @throws FileNotFoundException the file not found exception
	 */
	public void organize() throws FileNotFoundException {
		// Make sure we have a file loaded first
		if (this.file == null) {
			throw new RuntimeException();
		}

		// Clear output data, creating a new HashMap for our output data
		this.output = new HashMap<String, ArrayList<String[]>>();

		// Gather CSV input from file, group into HashMap such that
		// HashMap[String insuranceCompany] = ArrayList<String[]> entryRows
		Scanner scanner = null;
		try {
			scanner = new Scanner(this.file);

			while (scanner.hasNextLine()) {
				// Split the CSV row into an array of values
				String[] row = scanner.nextLine().split(",");
				String insurance = row[3];

				// Add a list of export data if it does not already exist
				this.output.putIfAbsent(insurance, new ArrayList<String[]>());

				// Get row list for this insurance company
				ArrayList<String[]> rows = this.output.get(insurance);

				// Add this row
				rows.add(row);
			}
		} finally {
			// Close the scanner when we are done
			if (scanner != null) {
				scanner.close();
			}
		}

		// Sort and compound
		for (ArrayList<String[]> rows : this.output.values()) {
			// Sort the group by lastName, firstName, userID
			rows.sort(new NameSorter());

			// Compound out of date entries
			for (int i = rows.size() - 1; i > 0; i--) {
				// Get current row's userID, version
				String[] row = rows.get(i);
				String userID = row[0];
				int version = Integer.parseInt(row[2]);

				// Compare this row's version with the next row's version
				String[] nextRow = rows.get(i - 1);
				String nextUserID = nextRow[0];
				int nextVersion = Integer.parseInt(nextRow[2]);

				// Check for duplicate entry of the same userID
				if (nextUserID.equals(userID)) {
					if (nextVersion < version) {
						// Remove the next entry, as it is not the latest version
						rows.remove(i - 1);
					} else {
						// Remove current entry, as it is not the latest version
						rows.remove(i);
					}
				}
			}
		}

		// Export new CSV files
		for (Map.Entry<String, ArrayList<String[]>> entry : output.entrySet()) {
			String insuranceTitle = entry.getKey();

			BufferedWriter export;
			try {
				// Create a new file for this specific insurance company
				File file = new File("src/Exports/" + insuranceTitle + " Users.csv");
				file.createNewFile();

				// Create a writer so that we can write CSV rows
				FileWriter writer = new FileWriter(file, true);
				export = new BufferedWriter(writer);

				// Add CSV rows
				ArrayList<String[]> rows = entry.getValue();
				for (int i = 0; i < rows.size(); i++) {
					// Create a string to represent the row
					String[] row = rows.get(i);
					String csvRow = String.join(",", row);
					csvRow = csvRow + "\n";

					// Append it to our new export
					export.append(csvRow);
				}

				// End export
				export.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		System.out.println("Successfully sorted and compounded target file.");
	}
}
