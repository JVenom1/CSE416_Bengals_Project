package Models;

public class ClusterDetails {
	private String name;
	private int plancount;
	private String averagesplit;
	private double averageopportunity;
	private double averagedistance;

	public int getPlancount() {
		return plancount;
	}
	public void setPlancount(int plancount) {
		this.plancount = plancount;
	}	

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getAverageopportunity() {
		return averageopportunity;
	}
	public void setAverageopportunity(double averageopportunity) {
		this.averageopportunity = averageopportunity;
	}
	public String getAveragesplit() {
		return averagesplit;
	}
	public void setAveragesplit(String averagesplit) {
		this.averagesplit = averagesplit;
	}
	public double getAveragedistance() {
		return averagedistance;
	}
	public void setAveragedistance(double averagedistance) {
		this.averagedistance = averagedistance;
	}




}
