package Models;

public class EnsembleList {
	private String name;
	private int ensemblesize;
	private int clustercount;
	private String averagesplit;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getEnsemblesize() {
		return ensemblesize;
	}
	public void setEnsemblesize(int ensemblesize) {
		this.ensemblesize = ensemblesize;
	}
	public int getClustercount() {
		return clustercount;
	}
	public void setClustercount(int clustercount) {
		this.clustercount = clustercount;
	}
	public String getAveragesplit() {
		return averagesplit;
	}
	public void setAveragesplit(String averagesplit) {
		this.averagesplit = averagesplit;
	}
}
