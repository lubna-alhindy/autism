'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'pep3_question',
			[
				{
          question: 'يجد شيء مخبئ تماما؟',
          goal: 'إيجاد شيئ مخبئ تماما',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يلتفت أو يتوجه نحو صوت الجرس اليدوي؟',
          goal: 'الإلتفات نحو صوت الجرس',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'الاستجابة لتقليد حركاته؟',
          goal: 'الاستجابة لتقليد حركاته',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'الاستجابة لتقليد أصواته؟',
          goal: 'الاستجابة لتقليد أصواته',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يستجيب لثلاث أوامر مكونة من جزء واحد أو فعل واحد؟',
          goal: 'الاستجابة لثلاث أوامر مكونة من جزء واحد أو فعل واحد',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يضع القطع الثلاث في أماكنها الصحيحة في لوح الأشكال؟',
          goal: 'وضع القطع الثلاث في أماكنها الصحيحة في لوح الأشكال',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يضع الأشكال في أماكنها الصحيحة على لوحة الأشكال؟',
          goal: 'وضع الأشكال في أماكنها الصحيحة على لوحة الأشكال',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يطابق 5 أشياء مع صورها؟',
          goal: 'مطابقة 5 أشياء مع صورها',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يطابق 5 مكعبات ملونة مع 5 دوائر ملونة؟',
          goal: 'مطابقة 5 مكعبات ملونة مع 5 دوائر ملونة',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يكمل لوحة الأشكال من 4 قطع؟',
          goal: 'إكمال لوحة أشكال من 4 قطع',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يردد 3 أصوات خلف الفاحص؟',
          goal: 'ترديد 3 أصوات خلف الفاحص',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يعيد ذكر رقمين؟',
          goal: 'إعادة ذكر رقمين',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يجد الطعام أو شيء محبب مخبأ تحت واحد من ثلاثة أغطية ويحرك الغطاء للحصول عليه؟',
          goal: 'إيجاد طعام أو شيء محبب مخبأ تحت واحد من ثلاثة أغطية وتحريك الغطاء للحصول عليه',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يختار 4 أشياء مخبأة في كيس من خلال اللمس؟',
          goal: 'اختيار 4 أشياء مخبأة في كيس من خلال اللمس',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يظهر اهتماما في كتاب الصور؟',
          goal: 'إظهار اهتمام في كتاب الصور',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يصنف المكعبات وأحجار الداما؟',
          goal: 'تصنيف المكعبات وأحجار الداما',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يردد كلمتين؟',
          goal: 'ترديد كلمتين',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يردد جملتين مكونتين من 3 الى أربع كلمات؟',
          goal: 'ترديد جملتين مكونتين من 3 الى أربع كلمات',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يقلد رسم الدائرة؟',
          goal: 'تقليد رسم الدائرة',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'ينسخ خط عامودي؟',
          goal: 'نسخ خط عامودي',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يقوم بتمثيلات صامتة ملائمة لوظائف 5 أشياء؟',
          goal: 'القيام بتمثيلات صامتة ملائمة لوظائف 5 أشياء',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يطابق 9 حروف؟',
          goal: 'مطابقة 9 حروف',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يعيد ذكر 3 أرقام؟',
          goal: 'إعادة ذكر 3 أرقام',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يصنف 12 بطاقة بحسب اللون والشكل دون الحاجة الى نمذجة؟',
          goal: 'تصنيف 12 بطاقة بحسب اللون والشكل دون الحاجة الى نمذجة',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يضع قطع أحجية القطة في أماكنها الصحيحة؟',
          goal: 'وضع قطع أحجية القطة في أماكنها الصحيحة',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يجمع أحجية الولد المكون من 8 قطع؟',
          goal: 'جمع أحجية الولد المكون من 8 قطع',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يقلد رسم المربع؟',
          goal: 'تقليد رسم المربع',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يرسم رجل ويحتوي الرجل على (رأس-جسد-ذراعين-رجلين-تفاصيل عامة للوجه)؟',
          goal: 'رسم رجل يحتوي على (رأس-جسد-ذراعين-رجلين-تفاصيل عامة للوجه)',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'ينسخ 7 حروف بشكل صحيح؟',
          goal: 'نسخ 7 حروف بشكل صحيح',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يكتب أسمه الأول؟',
          goal: 'كتابة أسمه الأول',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يركب أحجية من 6 قطع؟',
          goal: 'تركيب أحجية من 6 قطع',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يقلد رسم المثلث؟',
          goal: 'تقليد رسم المثلث',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يقلد رسم شكل الماسة؟',
          goal: 'تقليد رسم شكل الماسة',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يقوم بتفعيل 3 أدوات مصدرة للصوت؟',
          goal: 'تفعيل 3 أدوات مصدرة للصوت',
          pep3DomainId:1 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم الكلمات أو الايماءات للحصول على المساعدة؟',
          goal: 'استخدام الكلمات أو الايماءات للحصول على المساعدة',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يصدر 3 جمل ملائمة مكونة من كلمتين؟',
          goal: 'إصدار 3 جمل ملائمة مكونة من كلمتين',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يسمي 5 أشياء؟',
          goal: 'تسمية 5 أشياء',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يخبر باسمه عند سؤاله عنه؟',
          goal: 'الإخبار عن اسمه عند السؤال عنه',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يطلب الطعام أو الشراب؟',
          goal: 'طلب الطعام أو الشراب',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم تراكيب صحيحة نحويا ملائمة لعمره؟',
          goal: 'استخدام تراكيب صحيحة نحويا ملائمة لعمره',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يخبر بجنسه عند سؤاله عنه؟',
          goal: 'الاختبار بجنسه عند السؤال عنه',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يصف الأشياء لفظيا بناءا على كبرها وصغرها؟',
          goal: 'وصف الأشياء لفظيا بناءا على كبرها وصغرها',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يعد مكعبين وسبع مكعبات؟',
          goal: 'عد مكعبين وسبع مكعبات',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يسمي الاشكال (الدائرة-المربع-المثلث)؟',
          goal: 'تسمية الاشكال (الدائرة-المربع-المثلث)',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يصدر اسمين في صيغة الجمع؟',
          goal: 'إصدار اسمين في صيغة الجمع',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'ينتج جملة واحدة ملائمة مكونة من 4-5 كلمات؟',
          goal: 'إنتاج جملة واحدة ملائمة مكونة من 4-5 كلمات',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يسمي 14 صورة من أصل 20 بشكل صحيح (سجل باستخدام القسم 8)؟',
          goal: 'تسمية 14 صورة من أصل 20 بشكل صحيح (سجل باستخدام القسم 8)',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم الضمائر بشكل صحيح؟',
          goal: 'استخدام الضمائر بشكل صحيح',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يسمي 5 ألوان؟',
          goal: 'تسمية 5 ألوان',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يعد من 1 الى 10 بصوت مرتفع؟',
          goal: 'عد من 1 الى 10 بصوت مرتفع',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يقرأ الأرقام من 1 الى 10 بشكل صحيح؟',
          goal: 'قراءة الأرقام من 1 الى 10 بشكل صحيح',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يقرأ 3 كلمات؟',
          goal: 'قراءة 3 كلمات',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يقرأ جملة ويتبع التعليمات؟',
          goal: 'قراءة جملة وتتبع التعليمات',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يسمي تسع حروف بشكل صحيح؟',
          goal: 'تسمية تسع حروف بشكل صحيح',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يقرأ جملة قصيرة بشكل صحيح (سجل باستخدام القسم 8)؟',
          goal: 'قراءة جملة قصيرة بشكل صحيح',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يقرأ قطعة بما لا يزيد عن 3 أخطاء (سجل باستخدام القسم 8)؟',
          goal: 'قراءة قطعة بما لا يزيد عن 3 أخطاء',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يقرأ قطعة ويجيب عن سؤالين متعلقين بالقطعة بشكل صحيح (سجل باستخدام القسم 8)؟',
          goal: 'قراءة قطعة والإجابة عن سؤالين متعلقين بالقطعة بشكل صحيح',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يصدر ضمير واحد بشكل صحيح؟',
          goal: 'إصدار ضمير واحد بشكل صحيح',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يمثل قصة باستخدام دميتين؟',
          goal: 'تمثيل قصة باستخدام دميتين',
          pep3DomainId:2 ,
					createdAt: new Date(),
				},{
          question: 'يوقف النشاط عند سماع اسمه؟',
          goal: 'التوقف عن نشاط عند سماع اسمه',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يستجيب بشكل متواصل للتلميحات؟',
          goal: 'الاستجابة بشكل متواصل للتلميحات',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يستجيب لكلمة (لا أو توقف) وذلك بايقاف النشاط؟',
          goal: 'الاستجابة لكلمة (لا أو توقف) وذلك بايقاف النشاط',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يستجيب لأربعة تعليمات من جزء أو جزئين؟',
          goal: 'الاستجابة لأربعة تعليمات من جزء أو جزئين',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يشير الى 3 أجزاء من جسمه؟',
          goal: 'الإشارة الى 3 أجزاء من جسمه',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يميز أسماء ثلاث أشياء مألوفة عند سماعها؟',
          goal: 'تمييز أسماء ثلاث أشياء مألوفة عند سماعها',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يستجيب للأمر تعال الى هنا؟',
          goal: 'الاستجابة للأمر تعال الى هنا',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يعطي 3 أشياء للفاحص عندما يطلب منه ذلك؟',
          goal: 'إعطاء 3 أشياء للفاحص عندما يطلب منه ذلك',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يشير الى 3 أجزاء من جسم الدمية؟',
          goal: 'الإشارة الى 3 أجزاء من جسم الدمية',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يظهر فهمه للضمائر الشخصية؟',
          goal: 'إظهار فهمه للضمائر الشخصية',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يستجيب لطلب من شقين؟',
          goal: 'الاستجابة لطلب من شقين',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يشير الى 5 ألوان عند تسميتها؟',
          goal: 'الإشارة الى 5 ألوان عند تسميتها',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يختار الدائرة أو المربع أو المثلث عند تسميتها؟',
          goal: 'اختيار الدائرة أو المربع أو المثلث عند تسميتها',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يشير الى الأشكال بناء على حجمها (كبير– صغير)؟',
          goal: 'الإشارة الى الأشكال بناء على حجمها (كبير– صغير)',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يدرك معنى ثلاث أفعال حركية؟',
          goal: 'إدراك معنى ثلاث أفعال حركية',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يستجيب للأسئلة التي تبدأ ب (من,ماذا, أين , متى)؟',
          goal: 'الاستتجابة للأسئلة التي تبدأ ب (من,ماذا, أين , متى)',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يشير الى 14 صورة من ضمن 20 صورة عند تسميتها ( سجل باستخدام القسم8 )؟',
          goal: 'الإشارة الى 14 صورة من ضمن 20 صورة عند تسميتها',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يعطي الفاحص مكعبين وستة مكعبات بشكل صحيح؟',
          goal: 'إعطاء الفاحص مكعبين وستة مكعبات بشكل صحيح',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يتعرف على تسعة حروف بشكل صحيح؟',
          goal: 'التعرف على تسعة حروف بشكل صحيح',
          pep3DomainId:3 ,
					createdAt: new Date(),
				},{
          question: 'يتابع حركات فقاعات الصابون بصرياً؟',
          goal: 'متابعة حركات فقاعات الصابون بصرياً',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يتابع بصرياً وباستمرارية حركة الفقاعات أو أي شيء آخر مروراً بخط المنتصف؟',
          goal: 'متابعة بصرياً وباستمرارية حركة الفقاعات أو أي شيء آخر مروراً بخط المنتصف',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يفك غطاء علبة الصابون؟',
          goal: 'فك غطاء علبة الصابون',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'بعد العرض والنمذجة للطفل ينفخ فقاعات الصابون بنجاح؟',
          goal: 'بعد العرض والنمذجة للطفل نفخ فقاعات الصابون بنجاح',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم قبضة يده كالكماشة أو المقص لوضع الأوتاد في الصلصال وازالتها؟',
          goal: 'استخدام قبضة يده كالكماشة أو المقص لوضع الأوتاد في الصلصال وازالتها',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم قبضة اليد كالكماشة لالتقاط حبات الحلوى؟',
          goal: 'استخدام قبضة اليد كالكماشة لالتقاط حبات الحلوى',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يضع مكعب واحد في الصندوق؟',
          goal: 'وضع مكعب واحد في الصندوق',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'الخربشة التلقائية العشوائية؟',
          goal: 'الخربشة التلقائية العشوائية',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم كلتا يديه بشكل متناسق وفعال دائماً؟',
          goal: 'استخدام كلتا يديه بشكل متناسق وفعال دائماً',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم كلتا يديه لازالة 6 خرزات من عود تنظيف الغليون؟',
          goal: 'استخدام كلتا يديه لازالة 6 خرزات من عود تنظيف الغليون',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يشغل النور ويطفئه من المفتاح المخصص لذلك؟',
          goal: 'تشغيل النور وإطفائه من المفتاح المخصص لذلك',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يلضم خرزة واحدة؟',
          goal: 'لضم خرزة واحدة',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يدخل الأشكال في أماكنها الصحيحة على لوحة الأشكال؟',
          goal: 'إدخال الأشكال في أماكنها الصحيحة على لوحة الأشكال',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يقص ورقة باستخدام المقص؟',
          goal: 'قص ورقة باستخدام المقص',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يدخل القطع الثلاث في أماكنها الصحيحة؟',
          goal: 'إدخال القطع الثلاث في أماكنها الصحيحة',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يركب 8 مكعبات؟',
          goal: 'تركيب 8 مكعبات',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يركب قطع الأحجية الأربعة المتداخلة بشكل تام؟',
          goal: 'تركيب قطع الاحجية المتداخلة في أماكنها الصحيحة',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يظهر سيطرة مناسبة بالعين؟',
          goal: 'إظهار سيطرة مناسبة بالعين',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يتتبع 3 أشكال؟',
          goal: 'تتبع 3 أشكال',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يلون ضمن حدود؟',
          goal: 'تلوين ضمن حدود',
          pep3DomainId:4 ,
					createdAt: new Date(),
				},{
          question: 'يتخطى خط المنتصف لالتقاط قطع لوحة الأشكال؟',
          goal: 'تخطي خط المنتصف لالتقاط قطع لوحة الأشكال',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'ينقل الأشياء من يد الى أخرى؟',
          goal: 'نقل الأشياء من يد الى أخرى',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يصفق بالايدي؟',
          goal: 'تصفيق بالايدي',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يدفع الكرة نحو الهدف عن قصد؟',
          goal: 'دفع الكرة نحو الهدف عن قصد',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يمشي للأمام 4 خطوات على الأقل دون أن يسقط الكرة؟',
          goal: 'المشي للأمام 4 خطوات على الأقل دون إسقاط الكرة',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يرمي الكرة في محاولة 1 على الأقل من ضمن 3 محاولات؟',
          goal: 'رمي الكرة في محاولة 1 على الأقل من ضمن 3 محاولات',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يشرب من الكأس دون سكب؟',
          goal: 'شرب من الكأس دون سكب',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يظهر سيطرة احدى اليدين  يمين - يسار؟',
          goal: 'إظهار سيطرة احدى اليدين  يمين - يسار',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يركل الكرة في محاولة 1 على الأقل من 3 محاولات؟',
          goal: 'ركل الكرة في محاولة 1 على الأقل من 3 محاولات',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم ذات القدم دائماً لكرل الكرة أو يصعد الدرج دائماً مقدماً رجل معينة؟',
          goal: 'استخدام ذات القدم دائماً لكرل الكرة أو صعود الدرج دائماً مقدماً رجل معينة',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يقفز للأعلى والأسفل باستخدام كلتا القدمين؟',
          goal: 'القفز للأعلى والأسفل باستخدام كلتا القدمين',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يمسك الكرة (لقفها) في 1 على الأقل من 3 محاولات؟',
          goal: 'مسك الكرة (لقفها) في 1 على الأقل من 3 محاولات',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يصعد الدرج مستخدماً كلتا قدميه؟',
          goal: 'صعود الدرج مستخدماً كلتا قدميه',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يقف على رجل واحدة؟',
          goal: 'الوقوف على رجل واحدة',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يمرجح الخيط والخرز للأمام مثل البندول؟',
          goal: 'مرجحة الخيط والخرز للأمام مثل البندول',
          pep3DomainId:5 ,
					createdAt: new Date(),
				},{
          question: 'يغرس اصبعه في الصلصال محدثاً جوة؟',
          goal: 'غرس اصبعه في الصلصال محدثاً جوة',
          pep3DomainId:6 ,
					createdAt: new Date(),
				},{
          question: 'يحدد الاستخدام الملائم لأربع أشياء؟',
          goal: 'تحديد الاستخدام الملائم لأربع أشياء',
          pep3DomainId:6 ,
					createdAt: new Date(),
				},{
          question: 'يقلد حركات الحياة اليومية باستخدام الدمى؟',
          goal: 'تقليد حركات الحياة اليومية باستخدام الدمى',
          pep3DomainId:6 ,
					createdAt: new Date(),
				},{
          question: 'بعد الاستماع لأغنية عيد الميلاد, يتظاهر بنفخ الشموع؟',
          goal: 'بعد الاستماع لأغنية عيد الميلاد, التظاهر بنفخ الشموع',
          pep3DomainId:6 ,
					createdAt: new Date(),
				},{
          question: 'يقلد أداء ثلاث حركات عضلية كبرى؟',
          goal: 'تقليد أداء ثلاث حركات عضلية كبرى',
          pep3DomainId:6 ,
					createdAt: new Date(),
				},{
          question: 'يظهر الاستمتاع بالموسيقى من خلال الغناء والحركات؟',
          goal: 'إضهار الاستمتاع بالموسيقى من خلال الغناء والحركات',
          pep3DomainId:6 ,
					createdAt: new Date(),
				},{
          question: 'يلف الصلصال لتشكيل حبل طويل؟',
          goal: 'لف الصلصال لتشكيل حبل طويل',
          pep3DomainId:6 ,
					createdAt: new Date(),
				},{
          question: 'يلبس الدمى باليد ويحرك رأسها ويديها؟',
          goal: 'تلبيس الدمى باليد وتحريك رأسها ويديها',
          pep3DomainId:6 ,
					createdAt: new Date(),
				},{
          question: 'ينظر داخل العدسة السحرية ويلف الجزء المتحرك في قاع العدسة؟',
          goal: 'النظر داخل العدسة السحرية ولف الجزء المتحرك في قاع العدسة',
          pep3DomainId:6 ,
					createdAt: new Date(),
				},{
          question: 'يقلد قرع الجرس مرتين؟',
          goal: 'تقليد قرع الجرس مرتين',
          pep3DomainId:6 ,
					createdAt: new Date(),
				},{
          question: 'يستمتع بالتواصل الجسدي الطبيعي مع الفاحص؟',
          goal: 'الاستمتاع بالتواصل الجسدي الطبيعي مع الفاحص',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يستمتع بالدغدغة؟',
          goal: 'الاستمتاع بالدغدغة',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم تعابير الوجه للتعبير عن المشاعر؟',
          goal: 'استخدام تعابير الوجه للتعبير عن المشاعر',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يظهر المشاعر عبر الأوضاع الجسدية الملائمة؟',
          goal: 'إظهار المشاعر عبر الأوضاع الجسدية الملائمة',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يعبر عن مشاعر ملائمة خلال جلسة التقييم؟',
          goal: 'التعبير عن مشاعر ملائمة خلال جلسة التقييم',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يظهر تأثر ملائم خلال جلسة التقييم؟',
          goal: 'إظهار تأثر ملائم خلال جلسة التقييم',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يظهر درجة خوف ملائمة خلال جلسة التقييم؟',
          goal: 'إظهار درجة خوف ملائمة خلال جلسة التقييم',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يظهر مدى انتباه ملائم لعمره؟',
          goal: 'إظهار مدى انتباه ملائم لعمره',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم اسلوب المحاولة والخطأ للتصحيح الذاتي؟',
          goal: 'استخدام اسلوب المحاولة والخطأ للتصحيح الذاتي',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يصر على انجاز المهارات الملائمة نمائياً؟',
          goal: 'الإصرار على انجاز المهارات الملائمة نمائياً',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يظهر اهتماما خاص بالفاحص؟',
          goal: 'إظهار اهتماما خاص بالفاحص',
          pep3DomainId:7 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم الخيال في اللعب مع الدمى؟',
          goal: 'استخدام الخيال في اللعب مع الدمى',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'يبدأ بتكرار لعبة اجتماعية مع الفاحص؟',
          goal: 'البدء بتكرار لعبة اجتماعية مع الفاحص',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'يبدأ بتفاعل اجتماعي مع الفاحص؟',
          goal: 'البدء بتفاعل اجتماعي مع الفاحص',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'ينتظر دوره لوضع المكعبات في الصندوق؟',
          goal: 'انتظار دوره لوضع المكعبات في الصندوق',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'يستجيب للكلام بالنظر الى وجه الفاحص بشكل مباشر؟',
          goal: 'الاستجابة للكلام بالنظر الى وجه الفاحص بشكل مباشر',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'يتجاوب مع طلبات الفاحص؟',
          goal: 'التجاوب مع طلبات الفاحص',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'التواصل البصري الملائم خلال جلسة التقييم؟',
          goal: 'التواصل البصري الملائم خلال جلسة التقييم',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'يتعرف على صوت الفاحص خلال الأداء؟',
          goal: 'التعرف على صوت الفاحص خلال الأداء',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'يطلب المساعدة من الفاحص؟',
          goal: 'طلب المساعدة من الفاحص',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'يستجيب بشكل ملائم للفاحص من خلال التواصل البصري والاستماع والابتسام؟',
          goal: 'الاستجابة بشكل ملائم للفاحص من خلال التواصل البصري والاستماع والابتسام',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'يتأثر أداؤه بالمكافآت المادية؟',
          goal: 'تأثر أداؤه بالمكافآت المادية',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'يتأثر أداؤه بالمكافآت الاجتماعية؟',
          goal: 'تأثر أداؤه بالمكافآت الاجتماعية',
          pep3DomainId:8 ,
					createdAt: new Date(),
				},{
          question: 'يتفحص ملامس المكعبات بطريقة ملائمة؟',
          goal: 'فحص ملامس المكعبات بطريقة ملائمة',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يتفحص أدوات الاختبار ويلعب بها بشكل ملائم؟',
          goal: 'فحص أدوات الاختبار وااللعب بها بشكل ملائم',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'ينظر الى أدوات الاختبار والبيئة المحيطة بطريقة ملائمة؟',
          goal: 'النظر الى أدوات الاختبار والبيئة المحيطة بطريقة ملائمة',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يتوقف عن النشاط عند سماع الصفارة ويبحث عن الصوت؟',
          goal: 'التوقف عن النشاط عند سماع الصفارة والبحث عن الصوت',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يلعب برباط الحذاء بشكل ملائم؟',
          goal: 'اللعب برباط الحذاء بشكل ملائم',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يتعامل مع المعلومات البصرية بشكل ملائم؟',
          goal: 'التعامل مع المعلومات البصرية بشكل ملائم',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يلعب لوحده بطريقة ملائمة لعمره؟',
          goal: 'اللعب لوحده بطريقة ملائمة لعمره',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يستكشف بيئة الاختبار بطريقة ملائمة؟',
          goal: 'استكشاف بيئة الاختبار بطريقة ملائمة',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يستمع للفاحص ويصدر الاصوات بطريقة ملائمة؟',
          goal: 'الاستماع للفاحص وإصدار الاصوات بطريقة ملائمة',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يتفحص ملامس الأشياء بطريقة ملائمة؟',
          goal: 'فحص ملامس الأشياء بطريقة ملائمة',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يتذوق الأطعمة خلال جلسة التقييم دون لحس أو وضع الأشياء في الفم بطريقة ملائمة؟',
          goal: 'تذوق الأطعمة خلال جلسة التقييم دون لحس أو وضع الأشياء في الفم بطريقة ملائمة',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يبدي اهتماماً ملائماً بالشم؟',
          goal: 'إبداء اهتماماً ملائماً بالشم',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يكمل معظم المهارات الملائمة عمرياً؟',
          goal: 'إكمال معظم المهارات الملائمة عمرياً',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'ينتقل من مهمة الى أخرى بسهولة؟',
          goal: 'الانتقال من مهمة الى أخرى بسهولة',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'يظهر حركات جسدية ملائمة عمرياً؟',
          goal: 'إظهار حركات جسدية ملائمة عمرياً',
          pep3DomainId:9 ,
					createdAt: new Date(),
				},{
          question: 'لا يردد بشكل غير ملائم الكلمات والجمل بعد بعض التأخير؟',
          goal: 'الرد بشكل ملائم على الكلمات والجمل دون تأخير',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'لا يعيد الكلمات والجمل التي سمعها مؤخراً بطريقة غير ملائمة؟',
          goal: 'إعادة الكلمات والجمل التي سمعها مؤخراً بطريقة غير ملائمة',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'لا يكرر كلمات معينة أو أصوات بشكل متكرر؟',
          goal: 'عدم تكرار كلمات معينة أو أصوات بشكل متكرر',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'يتحدث بتنغيم طبيعي وسرعة معتدلة وعلو ملائم؟',
          goal: 'التحدث بتنغيم طبيعي وسرعة معتدلة وعلو ملائم',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'قليلاً ما يصدر أصوات غير ذات معنى أو غير صحيحة (لبلبة)؟',
          goal: 'تقليل إصدار أصوت دون معنى أو غير صحيحة (لبلبة)',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'يستخدم كلمات ملائمة عمرياً للتواصل مع الآخرين؟',
          goal: 'استخدام كلمات ملائمة عمرياً للتواصل مع الآخرين',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'لا يستخدم لغة قابلة للتمييز أو غير مفهومة (الرطن)؟',
          goal: 'استخدام لغة قابلة للتمييز أو مفهومة',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'يظهر نطق لفظي ملائم لعمره؟',
          goal: 'إظهار نطق لفظي ملائم لعمره',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'يتواصل لغوياً بشكل تلقائي وملائم لعمره؟',
          goal: 'التواصل اللغوي بشكل تلقائي وملائم لعمره',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'يتواصل بشكل تلقائي مع الفاحص؟',
          goal: 'التواصل بشكل تلقائي مع الفاحص',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'يحافظ على المحادثة حتى تغيير الموضوع لأكثر من مرة واحدة؟',
          goal: 'المحافظة على المحادثة حتى تغيير الموضوع لأكثر من مرة واحدة',
          pep3DomainId:10 ,
					createdAt: new Date(),
				},{
          question: 'هل يلتقط ويمضغ ويبلع الأطعمة الصغيرة؟',
          goal: 'التقاط ومضغ وبلع الأطعمة الصغيرة',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يمسك الطفل الكأس بيد واحدة ويشرب منها دون أن يسكب؟',
          goal: 'مسك الطفل الكأس بيد واحدة والشرب منها دون سكب',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يستخدم الطفل الملعقة والشوكة دون مساعدة؟',
          goal: 'استخدام الطفل الملعقة والشوكة دون مساعدة',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يمسك الطفل ابريق يحتوي على سائل ويصب منه مع بعض الإراقة؟',
          goal: 'مسك الطفل ابريق يحتوي على سائل والصب منه مع بعض الإراقة',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يغسل يديه ووجهه دون مساعدة؟',
          goal: 'غسل يديه ووجهه دون مساعدة',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يستحم الطفل دون مساعدة؟',
          goal: 'استحمام الطفل دون مساعدة',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يفرشي الطفل أسنانه دون مساعدة؟',
          goal: 'يفرشي الطفل أسنانه دون مساعدة',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يخلع الطفل ملابسه دون مساعدة؟',
          goal: 'خلع الطفل ملابسه دون مساعدة',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يلبس الطفل بنفسه بشكل كامل بما في ذلك ربط الحذاء دون مساعدة؟',
          goal: 'ارتداء الطفل ملابسه بنفسه بشكل كامل بما في ذلك ربط الحذاء دون مساعدة',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يختار الطفل الملابس الملائمة لكل يوم؟ وهل يختار الملابس الملائمة للظروف الجوية وللأنشطة اليومية؟',
          goal: 'اختيار الطفل الملابس الملائمة لكل يوم, واختيار الملابس الملائمة للظروف الجوية وللأنشطة اليومية',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يستطيع الطفل التبول والتبرز دون حدوث أية مشكلات؟',
          goal: 'قدرة الطفل التبول والتبرز دون حدوث أية مشكلات',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل يتذكر الطفل مكان ألعابه أو أماكن الأشياء المستخدمة بكثرة؟',
          goal: 'تذكر الطفل مكان ألعابه أو أماكن الأشياء المستخدمة بكثرة',
          pep3DomainId:11 ,
					createdAt: new Date(),
				},{
          question: 'هل ينام الطفل طوال الليل؟',
          goal: 'نوم الطفل طوال الليل',
          pep3DomainId:11 ,
					createdAt: new Date(),
				}
			],
			{}
		);
	},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
