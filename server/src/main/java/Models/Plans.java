package Models;

public class Plans{
	
	private String name;
	private boolean availibility;
	private int opportunitydistricts;
	private String rdsplit;


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRdsplit() {
		return rdsplit;
	}

	public void setRdsplit(String rdsplit) {
		this.rdsplit = rdsplit;
	}

	public int getOpportunitydistricts() {
		return opportunitydistricts;
	}

	public void setOpportunitydistricts(int opportunitydistricts) {
		this.opportunitydistricts = opportunitydistricts;
	}

	public boolean isAvailibility() {
		return availibility;
	}

	public void setAvailibility(boolean availibility) {
		this.availibility = availibility;
	}


}
