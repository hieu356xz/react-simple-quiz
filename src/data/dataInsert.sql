INSERT INTO Semester
VALUES
  (5, 'Học kỳ 1 2024-2025'),
  (6, 'Học kỳ 2 2024-2025');

INSERT INTO Subject
VALUES
  (911, 'Marketing số-2-24 (K21.CNTT.D1.K2)', 6),
  (972, 'Phát triển ứng dụng Python-2-24 (K21.CNTT.D1.K2)', 6),
  (1005, 'Phương pháp phát triển phần mềm hướng đối tượng-2-24 (K21.CNTT.D1.K2)', 6),
  (1018, 'Quản lý dự án CNTT-2-24 (K21.CNTT.D1.K2)', 6),
  (1034, 'Quản trị hệ thống-2-24 (K21.CNTT.D1.K2)', 6);

-- TEST DATA
INSERT INTO Question
VALUES
  (56220, '<!--StartFragment--><p class=\"MsoNormal\"><span lang=\"EN-US\">Nguyên nhân sâu xa làm xuất hiện marketing là gì?</span><o:p></o:p></p><p class=\"MsoNormal\"><o:p></o:p></p><!--EndFragment-->', 'radio', '[{"id":"1","value":"<p><!--StartFragment--><span lang=\"EN-US\">Sự phát triển công nghệ</span><!--EndFragment--></p>"},{"id":"2","value":"<p><!--StartFragment--><span lang=\"EN-US\">Cạnh tranh trong trao đổi</span><!--EndFragment--></p>"},{"id":"3","value":"<p><!--StartFragment--><span lang=\"EN-US\">Nhu cầu nghiên cứu thị trường</span><!--EndFragment--></p>"},{"id":"4","value":"<p><!--StartFragment--><span lang=\"EN-US\">Định giá sản phẩm</span><!--EndFragment--></p>"}]', 2, 1, 1),
  (56228, '<!--StartFragment--><p class=\"MsoNormal\"><span lang=\"EN-US\">Bản chất của marketing là gì?</span><o:p></o:p></p><p class=\"MsoNormal\"><o:p></o:p></p><!--EndFragment-->', 'radio', '[{"id":"1","value":"<p><!--StartFragment--><span lang=\"EN-US\">Phân tích đối thủ cạnh tranh</span><!--EndFragment--></p>"},{"id":"2","value":"<p><!--StartFragment--><span lang=\"EN-US\">Hiểu và đáp ứng nhu cầu Khách hàng</span><!--EndFragment--></p>"},{"id":"3","value":"<p><!--StartFragment--><span lang=\"EN-US\">Sử dụng công cụ kỹ thuật số để bán hàng</span><!--EndFragment--></p>"},{"id":"4","value":"<p><!--StartFragment--><span lang=\"EN-US\">Đẩy mạnh truyền thông quảng cáo</span><!--EndFragment--></p>"}]', 2, 1, 1),
  (6926, '<p><span style=\"background-color:white;color:#1A1D28;\"><span lang=\"EN-US\">Tại sao việc gán nhãn \"giải được\" hay \"không giải được\" cho các đỉnh trong đồ thị AND/OR lại quan trọng?</span></span></p>', 'radio', '[{"id":"1","value":"<p><span style=\"background-color:white;color:#1A1D28;\"><span lang=\"EN-US\">Vì nó giúp xác định thứ tự của các đỉnh trong đồ thị.</span></span></p>"},{"id":"2","value":"<p><span style=\"background-color:white;color:#1A1D28;\"><span lang=\"EN-US\">Vì nó giúp xác định liệu bài toán ban đầu có thể được giải quyết hay không</span></span></p>"},{"id":"3","value":"<p><span style=\"background-color:white;color:#1A1D28;\"><span lang=\"EN-US\">Vì nó thay đổi cấu trúc của đồ thị.</span></span></p>"},{"id":"4","value":"<p class=\"MsoNormal\"><span style=\"background-color:white;color:#1A1D28;\"><span lang=\"EN-US\">Vì nó làm cho đồ thị trở nên lớn hơn.</span></span><o:p></o:p></p>"}]', 2, 1, 1);

INSERT INTO Course
VALUES
  (1, 'Bài 1', 911, '[56220, 56228, 6926]');