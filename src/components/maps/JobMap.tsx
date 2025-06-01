import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPinIcon,
  NavigationIcon,
  FilterIcon,
  LayersIcon,
  ZoomInIcon,
  ZoomOutIcon,
  MapIcon,
  ListIcon,
  RefreshCwIcon,
} from "lucide-react";
import { Job } from "@/lib/types";

interface JobMapProps {
  jobs: Job[];
}

// Mock map component since we don't have actual map integration
export default function JobMap({ jobs }: JobMapProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // San Francisco
  const [zoomLevel, setZoomLevel] = useState(10);
  const [showTraffic, setShowTraffic] = useState(false);
  const [filterRadius, setFilterRadius] = useState(25); // km

  // Group jobs by location for clustering
  const jobClusters = useMemo(() => {
    const clusters = new Map();

    jobs.forEach((job) => {
      const locationKey = `${job.location.city}-${job.location.state}`;
      if (!clusters.has(locationKey)) {
        clusters.set(locationKey, {
          location: job.location,
          jobs: [],
          coordinates: job.location.coordinates || {
            lat: 37.7749 + (Math.random() - 0.5) * 0.1,
            lng: -122.4194 + (Math.random() - 0.5) * 0.1,
          },
        });
      }
      clusters.get(locationKey).jobs.push(job);
    });

    return Array.from(clusters.values());
  }, [jobs]);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    if (job.location.coordinates) {
      setMapCenter(job.location.coordinates);
    }
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    }
  };

  const formatDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) => {
    // Simple distance calculation (not accurate for production)
    const distance =
      Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2)) * 111; // Rough km conversion
    return `${distance.toFixed(1)} km`;
  };

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapIcon className="w-5 h-5" />
              Jobs Near You
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLocationRequest}
              >
                <NavigationIcon className="w-4 h-4 mr-1" />
                My Location
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTraffic(!showTraffic)}
              >
                <LayersIcon className="w-4 h-4 mr-1" />
                {showTraffic ? "Hide" : "Show"} Traffic
              </Button>
            </div>
          </div>
          <CardDescription>
            Discover {jobs.length} opportunities within {filterRadius}km of your
            location
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full relative">
              {/* Mock Map Background */}
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-lg relative overflow-hidden">
                {/* Map Grid Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} className="border border-gray-400" />
                    ))}
                  </div>
                </div>

                {/* Job Markers */}
                {jobClusters.map((cluster, index) => (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    style={{
                      left: `${((cluster.coordinates.lng + 122.4194) / 0.2) * 100}%`,
                      top: `${((37.7749 - cluster.coordinates.lat) / 0.1 + 0.5) * 100}%`,
                    }}
                    onClick={() => handleJobSelect(cluster.jobs[0])}
                  >
                    <div className="relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${
                          cluster.jobs.length > 5
                            ? "bg-red-500"
                            : cluster.jobs.length > 2
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }`}
                      >
                        {cluster.jobs.length}
                      </div>
                      {selectedJob && cluster.jobs.includes(selectedJob) && (
                        <div className="absolute -top-1 -left-1 w-10 h-10 rounded-full border-2 border-primary animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}

                {/* Current Location Marker */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{
                    left: `${((mapCenter.lng + 122.4194) / 0.2) * 100}%`,
                    top: `${((37.7749 - mapCenter.lat) / 0.1 + 0.5) * 100}%`,
                  }}
                >
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg">
                    <div className="w-full h-full bg-blue-600 rounded-full animate-ping opacity-75" />
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0">
                    <ZoomInIcon className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0">
                    <ZoomOutIcon className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0">
                    <RefreshCwIcon className="w-4 h-4" />
                  </Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span>1-2 jobs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      <span>3-5 jobs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span>5+ jobs</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Details Sidebar */}
        <div className="space-y-4">
          {selectedJob ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{selectedJob.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={selectedJob.company.logo}
                      alt={selectedJob.company.name}
                    />
                    <AvatarFallback className="text-xs">
                      {selectedJob.company.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {selectedJob.company.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="w-4 h-4" />
                  {selectedJob.location.city}, {selectedJob.location.state}
                  {selectedJob.location.coordinates && (
                    <Badge variant="secondary" className="text-xs">
                      {formatDistance(
                        mapCenter.lat,
                        mapCenter.lng,
                        selectedJob.location.coordinates.lat,
                        selectedJob.location.coordinates.lng,
                      )}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge>{selectedJob.workMode}</Badge>
                  <Badge variant="outline">
                    {selectedJob.jobType.replace("_", " ")}
                  </Badge>
                  {selectedJob.matchScore && (
                    <Badge variant="secondary">
                      {selectedJob.matchScore}% match
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Salary Range</div>
                  <div className="text-sm text-muted-foreground">
                    ${selectedJob.salary.min.toLocaleString()} - $
                    {selectedJob.salary.max.toLocaleString()} /{" "}
                    {selectedJob.salary.period}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedJob.skills.slice(0, 6).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Job Description</div>
                  <div className="text-sm text-muted-foreground line-clamp-4">
                    {selectedJob.description}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Apply Now</Button>
                  <Button variant="outline">Save Job</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <MapPinIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Select a Location</h3>
                <p className="text-muted-foreground text-sm">
                  Click on a marker to view job details and apply directly from
                  the map.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Nearby Jobs List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nearby Opportunities</CardTitle>
              <CardDescription>{jobs.length} jobs found</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-60 overflow-y-auto">
              {jobs.slice(0, 5).map((job) => (
                <div
                  key={job.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedJob?.id === job.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleJobSelect(job)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={job.company.logo}
                        alt={job.company.name}
                      />
                      <AvatarFallback className="text-xs">
                        {job.company.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {job.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {job.company.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {job.workMode}
                        </Badge>
                        {job.location.coordinates && (
                          <span className="text-xs text-muted-foreground">
                            {formatDistance(
                              mapCenter.lat,
                              mapCenter.lng,
                              job.location.coordinates.lat,
                              job.location.coordinates.lng,
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
