package Models;

public class States{
	private String name;
	private Ensembles[] ensembles;
	private ClusterAssociationCoordinates clusterassociationcoordinates;
	private ClusterAssociationCoordinates clusterassociationcoordinatesop; 
	private String currentplan;
    private EnsembleList[] ensemblelist;
    private StateDetails statedetails;

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Ensembles[] getEnsembles() {
		return ensembles;
	}
	public void setEnsembles(Ensembles[] ensembles) {
		this.ensembles = ensembles;
	}
	public ClusterAssociationCoordinates getClusterassociationcoordinates() {
		return clusterassociationcoordinates;
	}
	public void setClusterassociationcoordinates(ClusterAssociationCoordinates clusterassociationcoordinates) {
		this.clusterassociationcoordinates = clusterassociationcoordinates;
	}
	public String getCurrentplan() {
		return currentplan;
	}
	public void setCurrentplan(String currentplan) {
		this.currentplan = currentplan;
	}
	public EnsembleList[] getEnsemblelist() {
		return ensemblelist;
	}
	public void setEnsemblelist(EnsembleList[] ensemblelist) {
		this.ensemblelist = ensemblelist;
	}
	public ClusterAssociationCoordinates getClusterassociationcoordinatesop() {
		return clusterassociationcoordinatesop;
	}
	public void setClusterassociationcoordinatesop(ClusterAssociationCoordinates clusterassociationcoordinatesop) {
		this.clusterassociationcoordinatesop = clusterassociationcoordinatesop;
	}
	public StateDetails getStatedetails() {
		return statedetails;
	}
	public void setStatedetails(StateDetails statedetails) {
		this.statedetails = statedetails;
	}

}