# BillMaxInterview

### How to Run
To run the project:
- Navigate to /my-dashboard
- Ensure that React and bootstrap are installed. If they are not installed, use the command `npm install bootstrap react-bootstrap` (you will need npm for the installation).
- Run `npm run dev` in the terminal.
The interface should now be available at http://localhost:5173/

### Approach
I started by generating the frontend infrastructure + general framework using Generative AI to match the specifications of the Figma as a starting point, and then I added all the extra functionality like filtering and searching and sorting on top of that framework. I created a mock dataset in data/mockAccounts.js with 5 example data points to use for the project. For sorting, I added a toggle button next to the header of each table column that sorts all the data using that column in either ascending or descending order depending on the button toggle.

I also chose to add some more buttons than were in the Figma to have easier ways to remove the sorting, filters, and searches for user ease.

I decided to use React for its state hooks to make dynamic modification to the interface for filtering. For styling, I decided to use the bootstrap library for CSS because of familiarity.

### Limitations
Two large limitation of this interface currently are the dynamic viewport adjustment and accessibility. I did not choose to include aria-labels and tags for accessibility and I did not design the interface for smaller screen sizes, so there are currently a lot of styling issues on smaller screen sizes.