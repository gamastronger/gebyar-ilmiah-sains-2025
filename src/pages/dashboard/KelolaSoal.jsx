import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Textarea,
  Switch,
  Radio,
  Chip,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  IconButton,
  Select,
  Option,
  Breadcrumbs,
  Progress,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function Paket() {
  // Added jenjang state
  const [currentJenjang, setCurrentJenjang] = useState(null);
  const [soalList, setSoalList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [previewItem, setPreviewItem] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [statsData, setStatsData] = useState({});

  const jenjangOptions = [
    { id: "sd", name: "Sekolah Dasar (SD)", color: "green", icon: "fas fa-child" },
    { id: "smp", name: "Sekolah Menengah Pertama (SMP)", color: "blue", icon: "fas fa-user-graduate" }
  ];

  const [formData, setFormData] = useState({
    question: "",
    question_image: null,
    option_a: "",
    option_a_image: null,
    option_b: "",
    option_b_image: null,
    option_c: "",
    option_c_image: null,
    option_d: "",
    option_d_image: null,
    correct_answer: "",
    category_id: "",
    is_active: true,
    question_type: "multiple_choice",
    jenjang: "", // Added jenjang field
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchKategori();
    // Fetch only when jenjang is selected
    if (currentJenjang) {
      fetchSoal(currentJenjang);
      calculateStats(currentJenjang);
    }
  }, [currentJenjang]);

  // Updated to include jenjang parameter
  const fetchSoal = (jenjang) => {
    const dummySoalSD = [
      {
        id: 1,
        question: "Apa ibu kota Indonesia?",
        question_image: null,
        option_a: "Jakarta",
        option_a_image: null,
        option_b: "Bandung",
        option_b_image: null,
        option_c: "Surabaya",
        option_c_image: null,
        option_d: "Medan",
        option_d_image: null,
        correct_answer: "A",
        category_id: 1,
        category: { name: "Geografi" },
        is_active: true,
        question_type: "multiple_choice",
        jenjang: "sd",
      },
      {
        id: 2,
        question: "Siapakah presiden pertama Indonesia?",
        option_a: "Soekarno",
        option_a_image: null,
        option_b: "Soeharto",
        option_b_image: null,
        option_c: "Habibie",
        option_c_image: null,
        option_d: "Megawati",
        option_d_image: null,
        correct_answer: "A",
        category_id: 4,
        category: { name: "Sejarah" },
        is_active: true,
        question_type: "multiple_choice",
        jenjang: "sd",
      },
    ];

    const dummySoalSMP = [
      {
        id: 1,
        question: "Jelaskan proses fotosintesis!",
        correct_answer: "Proses fotosintesis adalah proses pembuatan makanan pada tumbuhan yang memerlukan cahaya matahari, air, dan karbon dioksida untuk menghasilkan glukosa dan oksigen.",
        category_id: 2,
        category: { name: "Biologi" },
        is_active: true,
        question_type: "essay",
        jenjang: "smp",
      },
      {
        id: 2,
        question: "Berapakah hasil dari 25 × 4?",
        option_a: "100",
        option_a_image: null,
        option_b: "75",
        option_b_image: null,
        option_c: "125",
        option_c_image: null,
        option_d: "90",
        option_d_image: null,
        correct_answer: "A",
        category_id: 3,
        category: { name: "Matematika" },
        is_active: true,
        question_type: "multiple_choice",
        jenjang: "smp",
      },
      {
        id: 3,
        question: "Sebutkan 3 negara anggota ASEAN beserta ibukotanya!",
        correct_answer: "1. Indonesia - Jakarta, 2. Malaysia - Kuala Lumpur, 3. Singapura - Singapura",
        category_id: 1,
        category: { name: "Geografi" },
        is_active: true,
        question_type: "essay",
        jenjang: "smp",
      },
    ];

    // Filter soal based on jenjang
    setSoalList(jenjang === "sd" ? dummySoalSD : dummySoalSMP);
  };

  const calculateStats = (jenjang) => {
    const data = jenjang === "sd" ? {
      totalSoal: 2,
      activeCount: 2,
      multipleChoiceCount: 2,
      essayCount: 0,
      categoryDistribution: { 
        "Geografi": 1,
        "Sejarah": 1
      }
    } : {
      totalSoal: 3,
      activeCount: 3,
      multipleChoiceCount: 1,
      essayCount: 2,
      categoryDistribution: {
        "Biologi": 1,
        "Matematika": 1,
        "Geografi": 1
      }
    };
    
    setStatsData(data);
  };

  const fetchKategori = () => {
    const dummyKategori = [
      { id: 1, name: "Geografi" },
      { id: 2, name: "Biologi" },
      { id: 3, name: "Matematika" },
      { id: 4, name: "Sejarah" },
      { id: 5, name: "Bahasa Indonesia" },
      { id: 6, name: "Bahasa Inggris" },
    ];
    setKategoriList(dummyKategori);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value, // Tangani file gambar
    });
  };

  const handleSubmit = () => {
    const requiredFields = ["question", "category_id", "question_type", "jenjang"];
    if (formData.question_type === "multiple_choice") {
      requiredFields.push("option_a", "option_b", "option_c", "option_d", "correct_answer");
    } else if (formData.question_type === "essay") {
      requiredFields.push("correct_answer");
    }

    if (requiredFields.some((field) => !formData[field])) {
      Swal.fire({
        title: "Error!",
        text: "Harap lengkapi semua kolom.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Simpan soal baru atau perbarui soal
    if (isEditing) {
      setSoalList((prev) =>
        prev.map((soal) =>
          soal.id === formData.id
            ? { ...soal, ...formData }
            : soal
        )
      );
    } else {
      const newSoal = {
        ...formData,
        id: soalList.length + 1,
      };
      setSoalList((prev) => [...prev, newSoal]);
    }

    Swal.fire({
      title: "Berhasil!",
      text: isEditing ? "Soal berhasil diperbarui!" : "Soal berhasil ditambahkan!",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });

    resetForm();
    setActiveTab("daftar");
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      category_id: item.category_id.toString(),
      jenjang: item.jenjang,
    });
    setIsEditing(true);
    setActiveTab("tambah");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Soal akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setSoalList((prev) => prev.filter((soal) => soal.id !== id));
        Swal.fire({
          title: "Terhapus!",
          text: "Soal berhasil dihapus.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        calculateStats(currentJenjang);
      }
    });
  };

  const handlePreview = (item) => {
    setPreviewItem(item);
    setActiveTab("preview");
  };

  const resetForm = () => {
    setFormData({
      question: "",
      question_image: null,
      option_a: "",
      option_a_image: null,
      option_b: "",
      option_b_image: null,
      option_c: "",
      option_c_image: null,
      option_d: "",
      option_d_image: null,
      correct_answer: "",
      category_id: "",
      is_active: true,
      question_type: "multiple_choice",
      jenjang: currentJenjang, // Set current jenjang as default
    });
    setIsEditing(false);
  };

  const handleJenjangSelect = (jenjang) => {
    setCurrentJenjang(jenjang);
    setFormData(prev => ({ ...prev, jenjang }));
    setActiveTab("dashboard");
  };

  const handleBackToHome = () => {
    setCurrentJenjang(null);
    setActiveTab("home");
    resetForm();
  };

  // Filter soal based on search term and selected category
  const filteredSoal = soalList.filter(
    (soal) =>
      soal.question.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || soal.category_id.toString() === selectedCategory)
  );

  const renderBreadcrumbs = () => {
    const jenjangName = jenjangOptions.find(j => j.id === currentJenjang)?.name || "";
    
    return (
      <Breadcrumbs className="bg-transparent">
        <a href="#" onClick={handleBackToHome} className="opacity-60 hover:text-blue-600">
          <i className="fas fa-home mr-1"></i> Home
        </a>
        {currentJenjang && (
          <a href="#" className="opacity-60">
            <i className={`${jenjangOptions.find(j => j.id === currentJenjang)?.icon} mr-1`}></i> {jenjangName}
          </a>
        )}
        {activeTab !== "dashboard" && activeTab !== "home" && (
          <a href="#" className={activeTab === "daftar" ? "" : "opacity-60"}>
            {activeTab === "tambah" ? (isEditing ? "Edit Soal" : "Tambah Soal") : 
             activeTab === "preview" ? "Preview Soal" : "Daftar Soal"}
          </a>
        )}
      </Breadcrumbs>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <Card className="shadow-xl mb-6 border-0 overflow-hidden">
        <CardHeader floated={false} className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 m-0">
          <div className="flex justify-between items-center">
            <div>
              <Typography variant="h4" color="white" className="font-bold">
                Kelola Bank Soal
              </Typography>
              <Typography color="white" className="mt-1 opacity-80">
                Sistem pengelolaan soal ujian dan kuis berbasis jenjang pendidikan
              </Typography>
            </div>
            {currentJenjang && (
              <Chip
                value={jenjangOptions.find(j => j.id === currentJenjang)?.name}
                color={currentJenjang === "sd" ? "green" : "blue"}
                icon={<i className={jenjangOptions.find(j => j.id === currentJenjang)?.icon}></i>}
                className="text-sm"
                size="lg"
              />
            )}
          </div>
        </CardHeader>
        
        <CardBody className="p-0">
          <div className="px-4 pt-4">
            {renderBreadcrumbs()}
          </div>
          
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
            <TabsHeader className={`bg-transparent p-2 ${currentJenjang === null ? "hidden" : ""}`}>
              <Tab value="dashboard" className="font-medium py-2">
                <i className="fas fa-chart-pie mr-2"></i> Dashboard
              </Tab>
              <Tab value="daftar" className="font-medium py-2">
                <i className="fas fa-list mr-2"></i> Daftar Soal
              </Tab>
              <Tab value="tambah" className="font-medium py-2">
                <i className={`fas ${isEditing ? "fa-edit" : "fa-plus"} mr-2`}></i>
                {isEditing ? "Edit Soal" : "Tambah Soal"}
              </Tab>
              {previewItem && (
                <Tab value="preview" className="font-medium py-2">
                  <i className="fas fa-eye mr-2"></i> Preview Soal
                </Tab>
              )}
            </TabsHeader>
            
            <TabsBody className="p-0">
              <TabPanel value="home" className="p-4">
                <div className="text-center py-6">
                  <Typography variant="h4" className="text-blue-800 mb-4">
                    Selamat Datang di Sistem Kelola Bank Soal
                  </Typography>
                  <Typography className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Silakan pilih jenjang pendidikan untuk memulai mengelola bank soal sesuai dengan tingkat pendidikan yang dipilih.
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
                    {jenjangOptions.map((jenjang) => (
                      <Card 
                        key={jenjang.id}
                        className="hover:shadow-lg transition-all cursor-pointer border border-gray-200 overflow-hidden"
                        onClick={() => handleJenjangSelect(jenjang.id)}
                      >
                        <CardHeader 
                          color={jenjang.color} 
                          className="relative h-24 flex items-center justify-center"
                        >
                          <i className={`${jenjang.icon} text-5xl text-white`}></i>
                        </CardHeader>
                        <CardBody className="text-center">
                          <Typography variant="h5" className="mb-2">{jenjang.name}</Typography>
                          <Typography variant="paragraph" className="text-gray-600">
                            Kelola soal khusus untuk jenjang {jenjang.id.toUpperCase()}
                          </Typography>
                        </CardBody>
                        <CardFooter divider className="flex items-center justify-center py-3">
                          <Button color={jenjang.color} variant="gradient" fullWidth>
                            <i className="fas fa-arrow-right mr-2"></i> Pilih
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabPanel>
              
              <TabPanel value="dashboard" className="p-4">
                <div className="mb-6">
                  <Typography variant="h5" className="text-gray-800 mb-4">
                    <i className="fas fa-tachometer-alt mr-2"></i> Dashboard Bank Soal {currentJenjang?.toUpperCase()}
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="shadow-sm border-0">
                      <CardBody className="p-4">
                        <div className="flex items-center">
                          <div className="rounded-full bg-blue-100 p-3 mr-4">
                            <i className="fas fa-clipboard-list text-blue-600 text-xl"></i>
                          </div>
                          <div>
                            <Typography variant="small" className="text-gray-600">Total Soal</Typography>
                            <Typography variant="h4">{statsData.totalSoal || 0}</Typography>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="shadow-sm border-0">
                      <CardBody className="p-4">
                        <div className="flex items-center">
                          <div className="rounded-full bg-green-100 p-3 mr-4">
                            <i className="fas fa-check-circle text-green-600 text-xl"></i>
                          </div>
                          <div>
                            <Typography variant="small" className="text-gray-600">Soal Aktif</Typography>
                            <Typography variant="h4">{statsData.activeCount || 0}</Typography>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="shadow-sm border-0">
                      <CardBody className="p-4">
                        <div className="flex items-center">
                          <div className="rounded-full bg-purple-100 p-3 mr-4">
                            <i className="fas fa-tasks text-purple-600 text-xl"></i>
                          </div>
                          <div>
                            <Typography variant="small" className="text-gray-600">Pilihan Ganda</Typography>
                            <Typography variant="h4">{statsData.multipleChoiceCount || 0}</Typography>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="shadow-sm border-0">
                      <CardBody className="p-4">
                        <div className="flex items-center">
                          <div className="rounded-full bg-amber-100 p-3 mr-4">
                            <i className="fas fa-pen text-amber-600 text-xl"></i>
                          </div>
                          <div>
                            <Typography variant="small" className="text-gray-600">Soal Esai</Typography>
                            <Typography variant="h4">{statsData.essayCount || 0}</Typography>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-sm border-0">
                      <CardHeader floated={false} className="bg-blue-50 py-3 px-4">
                        <Typography variant="h6" className="text-blue-900">
                          <i className="fas fa-chart-pie mr-2"></i> Distribusi Kategori
                        </Typography>
                      </CardHeader>
                      <CardBody className="p-4">
                        {statsData.categoryDistribution && Object.entries(statsData.categoryDistribution).map(([category, count]) => (
                          <div key={category} className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <Typography variant="small" className="text-gray-700">{category}</Typography>
                              <Typography variant="small" className="text-blue-700 font-medium">{count} soal</Typography>
                            </div>
                            <Progress 
                              value={(count / statsData.totalSoal) * 100} 
                              color={
                                category === "Geografi" ? "blue" : 
                                category === "Biologi" ? "green" : 
                                category === "Matematika" ? "amber" : 
                                category === "Sejarah" ? "red" : 
                                "indigo"
                              } 
                              className="h-1" 
                            />
                          </div>
                        ))}
                      </CardBody>
                    </Card>
                    
                    <Card className="shadow-sm border-0">
                      <CardHeader floated={false} className="bg-blue-50 py-3 px-4">
                        <Typography variant="h6" className="text-blue-900">
                          <i className="fas fa-bolt mr-2"></i> Aksi Cepat
                        </Typography>
                      </CardHeader>
                      <CardBody className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Button 
                            color="blue" 
                            variant="gradient" 
                            className="flex items-center justify-center py-3"
                            onClick={() => {
                              resetForm();
                              setActiveTab("tambah");
                            }}
                          >
                            <i className="fas fa-plus-circle mr-2"></i>
                            Tambah Soal Baru
                          </Button>
                          
                          <Button 
                            color="amber" 
                            variant="gradient" 
                            className="flex items-center justify-center py-3"
                            onClick={() => setActiveTab("daftar")}
                          >
                            <i className="fas fa-list mr-2"></i>
                            Lihat Daftar Soal
                          </Button>
                          
                          <Button 
                            color="green" 
                            variant="gradient" 
                            className="flex items-center justify-center py-3"
                            onClick={() => {
                              // Export functionality would go here
                              Swal.fire({
                                title: "Ekspor Soal",
                                text: "Fitur ekspor soal akan segera tersedia",
                                icon: "info"
                              });
                            }}
                          >
                            <i className="fas fa-file-export mr-2"></i>
                            Ekspor Soal
                          </Button>
                          
                          <Button 
                            color="indigo" 
                            variant="gradient" 
                            className="flex items-center justify-center py-3"
                            onClick={() => {
                              // Import functionality would go here
                              Swal.fire({
                                title: "Impor Soal",
                                text: "Fitur impor soal akan segera tersedia",
                                icon: "info"
                              });
                            }}
                          >
                            <i className="fas fa-file-import mr-2"></i>
                            Impor Soal
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value="tambah" className="p-4">
                <Card className="shadow-sm border-0 overflow-visible">
                  <CardHeader floated={false} className="bg-blue-50 p-4">
                    <Typography variant="h5" className="text-gray-800">
                      <i className={`fas ${isEditing ? "fa-edit" : "fa-plus-circle"} mr-2`}></i>
                      {isEditing ? "Edit Soal" : "Tambah Soal Baru"}
                    </Typography>
                  </CardHeader>
                  
                  <CardBody className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Textarea
                          label="Pertanyaan"
                          name="question"
                          value={formData.question}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-md shadow-sm"
                          size="lg"
                        />
                      </div>

                      <div>
                        <Typography variant="small" className="mb-2 font-medium text-gray-700">
                          Gambar Soal (Opsional)
                        </Typography>
                        <div className="border border-dashed border-gray-400 rounded-lg p-4 bg-gray-50">
                          <input
                            type="file"
                            name="question_image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full text-sm"
                          />
                          {formData.question_image && (
                            <Typography variant="small" className="mt-2 text-green-600">
                              <i className="fas fa-check-circle mr-1"></i>
                              Gambar terpilih: {formData.question_image.name}
                            </Typography>
                          )}
                        </div>
                      </div>

                      <div>
                        <Typography variant="small" className="mb-2 font-medium text-gray-700">
                          Jenis Soal
                        </Typography>
                        <div className="flex gap-4">
                          <Radio
                            name="question_type"
                            value="multiple_choice"
                            onChange={handleChange}
                            checked={formData.question_type === "multiple_choice"}
                            label={<div className="flex items-center"><i className="fas fa-tasks mr-2 text-blue-500"></i>Pilihan Ganda</div>}
                            color="blue"
                          />
                          <Radio
                            name="question_type"
                            value="essay"
                            onChange={handleChange}
                            checked={formData.question_type === "essay"}
                            label={<div className="flex items-center"><i className="fas fa-pen mr-2 text-amber-500"></i>Esai</div>}
                            color="blue"
                          />
                        </div>
                      </div>

                      <div>
                        <Typography variant="small" className="mb-2 font-medium text-gray-700">
                          Kategori Soal
                        </Typography>
                        <select
                          name="category_id"
                          value={formData.category_id}
                          onChange={handleChange}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm"
                        >
                          <option value="">Pilih Kategori</option>
                          {kategoriList.map((kat) => (
                            <option key={kat.id} value={kat.id}>
                              {kat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Typography variant="small" className="mb-2 font-medium text-gray-700">
                          Jenjang Pendidikan
                        </Typography>
                        <div className="flex gap-4">
                          {jenjangOptions.map((jenjang) => (
                            <Radio
                              key={jenjang.id}
                              name="jenjang"
                              value={jenjang.id}
                              onChange={handleChange}
                              checked={formData.jenjang === jenjang.id}
                              label={
                                <div className="flex items-center">
                                  <i className={`${jenjang.icon} mr-2 text-${jenjang.color}-500`}></i>
                                  {jenjang.name}
                                </div>
                              }
                              color={jenjang.color}
                              disabled={currentJenjang && currentJenjang !== jenjang.id}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Switch
                          label={
                            <Typography className="text-gray-700">
                              Status Soal: <span className={formData.is_active ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                {formData.is_active ? "Aktif" : "Tidak Aktif"}
                              </span>
                            </Typography>
                          }
                          checked={formData.is_active}
                          name="is_active"
                          onChange={handleChange}
                          color="green"
                        />
                      </div>

                      {formData.question_type === "multiple_choice" && (
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {["A", "B", "C", "D"].map((opt, index) => (
                            <div key={opt} className={`border rounded-lg p-4 bg-white shadow-sm ${formData.correct_answer === opt ? "border-green-400 ring-1 ring-green-300" : ""}`}>
                              <div className="flex items-center gap-2 mb-3">
                                <Typography variant="small" className="font-medium text-gray-700">
                                  Pilihan {opt}
                                </Typography>
                                <Radio
                                  name="correct_answer"
                                  value={opt}
                                  onChange={handleChange}
                                  checked={formData.correct_answer === opt}
                                  color="green"
                                />
                                 <Typography className="font-medium">
                                  Opsi {opt} {formData.correct_answer === opt && <span className="text-green-600">(Jawaban Benar)</span>}
                                </Typography>
                              </div>
                              <Input
                                label={`Teks Pilihan ${opt}`}
                                name={`option_${opt.toLowerCase()}`}
                                value={formData[`option_${opt.toLowerCase()}`]}
                                onChange={handleChange}
                                className="mb-2"
                              />
                              <Typography variant="small" className="mt-2 text-gray-700">
                                Gambar Opsi {opt} (Opsional)
                              </Typography>
                              <input
                                type="file"
                                name={`option_${opt.toLowerCase()}_image`}
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full text-sm mt-1"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {formData.question_type === "essay" && (
                        <div className="md:col-span-2">
                          <Textarea
                            label="Kunci Jawaban Esai"
                            name="correct_answer"
                            value={formData.correct_answer}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md shadow-sm"
                            size="lg"
                            rows={5}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                      <Button
                        onClick={resetForm}
                        color="red"
                        className="rounded-md shadow-sm flex items-center"
                        variant="outlined"
                      >
                        <i className="fas fa-undo mr-2"></i> Reset
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        color={isEditing ? "blue" : "green"}
                        className="rounded-md shadow-sm flex items-center"
                      >
                        <i className={`fas ${isEditing ? "fa-save" : "fa-plus-circle"} mr-2`}></i>
                        {isEditing ? "Perbarui Soal" : "Tambah Soal"}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </TabPanel>

              <TabPanel value="daftar" className="p-4">
                <Card className="shadow-sm border-0">
                  <CardHeader floated={false} className="bg-blue-50 p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <Typography variant="h5" className="text-gray-800">
                        <i className="fas fa-list mr-2"></i> Daftar Soal {currentJenjang?.toUpperCase()}
                      </Typography>
                      <Button
                        color="green"
                        onClick={() => {
                          resetForm();
                          setActiveTab("tambah");
                        }}
                        className="whitespace-nowrap flex items-center"
                        size="sm"
                      >
                        <i className="fas fa-plus-circle mr-2"></i> Tambah Soal Baru
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardBody className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                      <div className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="relative flex w-full max-w-[24rem]">
                          <Input
                            label="Cari Soal"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pr-10"
                            icon={<i className="fas fa-search" />}
                          />
                        </div>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="border border-gray-300 px-3 py-2 rounded-md shadow-sm w-full md:w-48"
                        >
                          <option value="">Semua Kategori</option>
                          {kategoriList.map((kat) => (
                            <option key={kat.id} value={kat.id}>
                              {kat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {filteredSoal.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                        <i className="fas fa-search text-4xl text-gray-400 mb-3"></i>
                        <Typography variant="h6" className="text-gray-500">
                          Tidak ada soal yang ditemukan
                        </Typography>
                        <Typography className="text-gray-400 mt-2">
                          Ubah kriteria pencarian atau tambahkan soal baru
                        </Typography>
                        <Button 
                          variant="text" 
                          color="blue" 
                          className="mt-4"
                          onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("");
                          }}
                        >
                          Reset Pencarian
                        </Button>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-blue-50">
                              <th className="py-3 px-4 border border-blue-100 font-medium text-blue-900">No.</th>
                              <th className="py-3 px-4 border border-blue-100 font-medium text-blue-900">Pertanyaan</th>
                              <th className="py-3 px-4 border border-blue-100 font-medium text-blue-900">Kategori</th>
                              <th className="py-3 px-4 border border-blue-100 font-medium text-blue-900">Jenis</th>
                              <th className="py-3 px-4 border border-blue-100 font-medium text-blue-900">Status</th>
                              <th className="py-3 px-4 border border-blue-100 font-medium text-blue-900 text-center">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredSoal.map((soal, index) => (
                              <tr
                                key={soal.id}
                                className={`hover:bg-blue-50 transition duration-150 ${
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                              >
                                <td className="py-3 px-4 border border-gray-100 text-center">{index + 1}</td>
                                <td className="py-3 px-4 border border-gray-100 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                  {soal.question}
                                </td>
                                <td className="py-3 px-4 border border-gray-100">
                                  <Chip
                                    value={soal.category?.name || "-"}
                                    size="sm"
                                    variant="ghost"
                                    color={
                                      soal.category?.name === "Matematika"
                                        ? "blue"
                                        : soal.category?.name === "Biologi"
                                        ? "green"
                                        : soal.category?.name === "Sejarah"
                                        ? "red"
                                        : "amber"
                                    }
                                  />
                                </td>
                                <td className="py-3 px-4 border border-gray-100">
                                  <Chip
                                    value={soal.question_type === "multiple_choice" ? "Pilihan Ganda" : "Esai"}
                                    size="sm"
                                    variant="ghost"
                                    color={soal.question_type === "multiple_choice" ? "purple" : "amber"}
                                    icon={<i className={soal.question_type === "multiple_choice" ? "fas fa-tasks" : "fas fa-pen"}></i>}
                                  />
                                </td>
                                <td className="py-3 px-4 border border-gray-100">
                                  <Chip
                                    value={soal.is_active ? "Aktif" : "Tidak Aktif"}
                                    size="sm"
                                    color={soal.is_active ? "green" : "red"}
                                  />
                                </td>
                                <td className="py-3 px-4 border border-gray-100">
                                  <div className="flex justify-center gap-2">
                                    <IconButton
                                      color="blue"
                                      size="sm"
                                      onClick={() => handlePreview(soal)}
                                      className="rounded-full"
                                      title="Lihat Preview"
                                    >
                                      <i className="fas fa-eye"></i>
                                    </IconButton>
                                    <IconButton
                                      color="amber"
                                      size="sm"
                                      onClick={() => handleEdit(soal)}
                                      className="rounded-full"
                                      title="Edit Soal"
                                    >
                                      <i className="fas fa-pencil-alt"></i>
                                    </IconButton>
                                    <IconButton
                                      color="red"
                                      size="sm"
                                      onClick={() => handleDelete(soal.id)}
                                      className="rounded-full"
                                      title="Hapus Soal"
                                    >
                                      <i className="fas fa-trash"></i>
                                    </IconButton>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardBody>
                  
                  <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Menampilkan {filteredSoal.length} dari {soalList.length} soal
                    </Typography>
                    <div className="flex gap-2">
                      <Button variant="outlined" size="sm" color="blue-gray" disabled>
                        <i className="fas fa-chevron-left mr-1"></i> Sebelumnya
                      </Button>
                      <Button variant="outlined" size="sm" color="blue-gray" disabled>
                        Selanjutnya <i className="fas fa-chevron-right ml-1"></i>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabPanel>

              <TabPanel value="preview" className="p-4">
                {previewItem && (
                  <Card className="shadow-sm border border-gray-200">
                    <CardHeader
                      floated={false}
                      color={previewItem.question_type === "multiple_choice" ? "blue" : "indigo"}
                      className="m-0 p-4 h-auto"
                    >
                      <div className="flex justify-between items-center">
                        <Typography variant="h6" color="white">
                          Preview Soal {previewItem.id}
                        </Typography>
                        <div className="flex gap-2">
                          <Chip
                            value={previewItem.question_type === "multiple_choice" ? "Pilihan Ganda" : "Esai"}
                            size="sm"
                            className="text-white"
                            icon={<i className={previewItem.question_type === "multiple_choice" ? "fas fa-tasks" : "fas fa-pen"}></i>}
                          />
                          <Chip
                            value={previewItem.category?.name || "-"}
                            size="sm"
                            className="text-white"
                          />
                          <Chip
                            value={previewItem.jenjang === "sd" ? "SD" : "SMP"}
                            size="sm"
                            className="text-white"
                            icon={<i className={previewItem.jenjang === "sd" ? "fas fa-child" : "fas fa-user-graduate"}></i>}
                          />
                        </div>
                      </div>
                    </CardHeader>

                    <CardBody className="px-6 py-5">
                      <div className="border-b pb-4 mb-4">
                        <Typography variant="h6" className="text-gray-900 font-medium mb-2 flex items-center">
                          <i className="fas fa-question-circle mr-2 text-blue-500"></i> Pertanyaan:
                        </Typography>
                        <Typography className="text-gray-800">{previewItem.question}</Typography>
                        {previewItem.question_image && (
                          <div className="mt-4 p-2 border border-gray-200 rounded-lg inline-block">
                            <img
                              src={URL.createObjectURL(previewItem.question_image)}
                              alt="Gambar Soal"
                              className="max-w-xs h-auto rounded-md"
                            />
                          </div>
                        )}
                      </div>

                      {previewItem.question_type === "multiple_choice" && (
                        <div className="mt-4">
                          <Typography variant="h6" className="text-gray-900 font-medium mb-2 flex items-center">
                            <i className="fas fa-list-ul mr-2 text-blue-500"></i> Pilihan Jawaban:
                          </Typography>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["A", "B", "C", "D"].map((opt) => (
                              <div
                                key={opt}
                                className={`border rounded-lg p-3 ${
                                  previewItem.correct_answer === opt
                                    ? "bg-green-50 border-green-300"
                                    : "bg-gray-50"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      previewItem.correct_answer === opt
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-200"
                                    }`}
                                  >
                                    {opt}
                                  </div>
                                  <div>
                                    <Typography className="text-gray-800">
                                      {previewItem[`option_${opt.toLowerCase()}`]}
                                      {previewItem.correct_answer === opt && (
                                        <div className="text-green-600 font-medium flex items-center mt-1">
                                          <i className="fas fa-check-circle mr-1"></i> Jawaban Benar
                                        </div>
                                      )}
                                    </Typography>
                                    {previewItem[`option_${opt.toLowerCase()}_image`] && (
                                      <div className="mt-2 p-1 border border-gray-200 rounded-lg inline-block">
                                        <img
                                          src={URL.createObjectURL(
                                            previewItem[`option_${opt.toLowerCase()}_image`]
                                          )}
                                          alt={`Gambar Opsi ${opt}`}
                                          className="max-w-xs h-auto rounded-md"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {previewItem.question_type === "essay" && (
                        <div className="mt-4">
                          <Typography variant="h6" className="text-gray-900 font-medium mb-2 flex items-center">
                            <i className="fas fa-key mr-2 text-amber-500"></i> Kunci Jawaban:
                          </Typography>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <Typography className="text-gray-800 whitespace-pre-line">
                              {previewItem.correct_answer}
                            </Typography>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <Typography variant="h6" className="text-blue-900 font-medium mb-2 flex items-center">
                          <i className="fas fa-info-circle mr-2"></i> Informasi Soal
                        </Typography>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                          <div>
                            <Typography className="text-gray-600 text-sm">Jenjang:</Typography>
                            <Typography className="font-medium">
                              {previewItem.jenjang === "sd" ? "Sekolah Dasar (SD)" : "Sekolah Menengah Pertama (SMP)"}
                            </Typography>
                          </div>
                          <div>
                            <Typography className="text-gray-600 text-sm">Kategori:</Typography>
                            <Typography className="font-medium">{previewItem.category?.name}</Typography>
                          </div>
                          <div>
                            <Typography className="text-gray-600 text-sm">Jenis Soal:</Typography>
                            <Typography className="font-medium">
                              {previewItem.question_type === "multiple_choice" ? "Pilihan Ganda" : "Esai"}
                            </Typography>
                          </div>
                          <div>
                            <Typography className="text-gray-600 text-sm">Status:</Typography>
                            <Typography className={`font-medium ${previewItem.is_active ? "text-green-600" : "text-red-600"}`}>
                              {previewItem.is_active ? "Aktif" : "Tidak Aktif"}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </CardBody>

                    <CardFooter className="pt-0 flex justify-end gap-2">
                      <Button
                        variant="outlined"
                        color="blue"
                        size="sm"
                        className="flex items-center"
                        onClick={() => setActiveTab("daftar")}
                      >
                        <i className="fas fa-arrow-left mr-2"></i> Kembali ke Daftar
                      </Button>
                      <Button
                        color="amber"
                        size="sm"
                        className="flex items-center"
                        onClick={() => handleEdit(previewItem)}
                      >
                        <i className="fas fa-edit mr-2"></i> Edit Soal Ini
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Paket;